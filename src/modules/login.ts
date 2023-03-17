import AuthToken from "@/modules/authtoken";

const STORAGE_NAME = "AUTH_TOKEN";
const SERVER_URL1: string = "https://first-server.azurewebsites.net/check.html";
const SERVER_URL2: string = "https://second-server.azurewebsites.net/check.html";
const url = `${location.protocol}//${location.host}${import.meta.env.BASE_URL}`;
const authTokenUrl = `https://first-server.azurewebsites.net/login.jsp?popup_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fpopup.jsp%3Fjump_url%3Dhttps%3A%2F%2Fsecond-server.azurewebsites.net%2Findex.jsp&auth_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fauth.jsp&return_url=https%3A%2F%2Ffirst-server.azurewebsites.net%2Fredirect.jsp&redirect_url=${url}`;

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

const removeAuthToken = (force: boolean) => {
  sessionStorage.removeItem(STORAGE_NAME);
  if (force) localStorage.removeItem(STORAGE_NAME);
};

const checkServer = async (timeout: number) => {
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

export { isLogin, getAutnToken, removeAuthToken, checkServer, authTokenUrl };
