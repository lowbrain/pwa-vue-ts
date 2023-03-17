const STORAGE_NAME = "AUTH_TOKEN";
const SERVER_URL1: string = "https://first-server.azurewebsites.net/check.html";
const SERVER_URL2: string = "https://second-server.azurewebsites.net/check.html";
const url = `${location.protocol}//${location.host}${import.meta.env.BASE_URL}`;
const authTokenUrl = `https://first-server.azurewebsites.net/login.jsp?popup_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fpopup.jsp%3Fjump_url%3Dhttps%3A%2F%2Fsecond-server.azurewebsites.net%2Findex.jsp&auth_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fauth.jsp&return_url=https%3A%2F%2Ffirst-server.azurewebsites.net%2Fredirect.jsp&redirect_url=${url}`;

class AuthToken {
  private _data: ArrayBuffer;
  private _signature: ArrayBuffer;

  public constructor(param: string) {
    const tokens = param.split(".");
    if (tokens.length === 2) {
      this._data = decodeBase64URL(tokens[0]);
      this._signature = decodeBase64URL(tokens[1]);
    } else {
      this._data = new ArrayBuffer(0);
      this._signature = new ArrayBuffer(0);
    }
  }

  public async verify(): Promise<boolean> {
    const key = await importRsaKey(VERIFY_KEY);
    return await window.crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, this._signature, this._data);
  }

  public get data(): ArrayBuffer {
    return this._data;
  }

  public get signature(): ArrayBuffer {
    return this._signature;
  }
}

const VERIFY_KEY: string = import.meta.env.VITE_APP_VERIFY_KEY;

const importRsaKey = (pem: string): Promise<CryptoKey> => {
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem.replace(pemHeader, "").replace(pemFooter, "").replace(/\n/g, "");
  const binaryDerString = atob(pemContents);
  const binaryDer = str2ab(binaryDerString);

  return window.crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    true,
    ["verify"]
  );
};

const str2ab = (str: string): ArrayBuffer => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

const decodeBase64URL = (param: string): ArrayBuffer => {
  const binaryStr = atob(convertToB64String(param));
  const buf = new ArrayBuffer(binaryStr.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = binaryStr.length; i < strLen; i++) {
    bufView[i] = binaryStr.charCodeAt(i);
  }
  return buf;
};

const convertToB64String = (b64urlString: string): string => {
  let b64string = b64urlString.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64string.length % 4;
  if (pad) b64string += new Array(5 - pad).join("=");
  return b64string;
};

const isLogin = async (token: string): Promise<boolean> => {
  let result: boolean = false;

  if (token.length === 0 && sessionStorage.getItem(STORAGE_NAME)) {
    result = true;
  } else {
    let unverifyToken: string = token;
    if (unverifyToken === "cache" && !localStorage.getItem(STORAGE_NAME)) {
      throw "認証データがキャッシュされていないためキャッシュログインに失敗しました。";
    } else if (unverifyToken === "cache" && localStorage.getItem(STORAGE_NAME)) {
      unverifyToken = localStorage.getItem(STORAGE_NAME) ?? "";
    }

    try {
      const authToken = new AuthToken(unverifyToken);
      result = await authToken.verify();
    } catch (err) {
      throw "認証トークンの署名の検証に失敗しました。¥n" + err;
    }

    if (result) {
      localStorage.setItem(STORAGE_NAME, unverifyToken);
      sessionStorage.setItem(STORAGE_NAME, unverifyToken);
    }

    return result;
  }

  return result;
};

const getAutnToken = (): AuthToken => {
  const token = sessionStorage.getItem(STORAGE_NAME) ?? "";
  if (token.length == 0) {
    throw "ログインがすんでいません。";
  }
  return new AuthToken(token);
};

const removeAuthToken = () => {
  sessionStorage.removeItem(STORAGE_NAME);
};

const removeAuthTokenAll = () => {
  sessionStorage.removeItem(STORAGE_NAME);
  localStorage.removeItem(STORAGE_NAME);
};

const connectServer = async (timeout: number) => {
  if ("onLine" in navigator && navigator.onLine) {
    // fetchのタイムアウト時間を設定
    const ctrl: AbortController = new AbortController();
    const timer: number = setTimeout(() => ctrl.abort(), timeout * 1000);

    // サーバへの接続確認
    try {
      const response1 = await fetch(SERVER_URL1, { signal: ctrl.signal, cache: "no-store" });
      const response2 = await fetch(SERVER_URL2, { signal: ctrl.signal, cache: "no-store" });
      if (!(await response1.ok) || !(await response2.ok)) {
        throw `http status error.
        fetch.url = ${SERVER_URL1}, response.status = ${response1.status}, response.statusText = ${response1.statusText}
        fetch.url = ${SERVER_URL2}, response.status = ${response2.status}, response.statusText = ${response2.statusText}`;
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw `timeout error(${timeout}s)`;
      } else {
        throw err;
      }
    }

    // タイムアウトの設定リセット
    clearTimeout(timer);
  }
};

export { AuthToken, isLogin, getAutnToken, removeAuthToken, removeAuthTokenAll, connectServer, authTokenUrl };
