export default class AuthToken {
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
