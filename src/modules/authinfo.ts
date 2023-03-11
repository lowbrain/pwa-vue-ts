import { verify } from "@/modules/token";

export default class AuthInfo {
  private _token: string;
  private _userid: string;
  private _timestamp: Date;

  public constructor(param: string) {
    // 認証トークンの設定
    if (param === "cache" && localStorage.getItem("AUTH_INFO")) {
      this._token = localStorage.getItem("AUTH_INFO") ?? "";
    } else {
      this._token = param;
    }
    if (this._token.length <= 0) throw "認証トークンがありません。";

    // 認証データXMLの取得
    const tokens = this._token.split(".");
    if (tokens.length === 1) throw "認証トークンのデータ構造が誤っています。";
    const dataBuff = decodeBase64URL(tokens[0]);
    const parserStr = new TextDecoder().decode(dataBuff);
    const authXml = new DOMParser().parseFromString(parserStr, "text/xml");
    console.log(parserStr);

    // ユーザID
    const useridTag = authXml.getElementsByTagName("userid");
    this._userid = useridTag.item(0)?.textContent ?? "";

    // タイムスタンプ
    const timestampTag = authXml.getElementsByTagName("timestamp");
    this._timestamp = new Date(timestampTag.item(0)?.textContent ?? "") ?? new Date();
  }

  public static getLoginInstance(): AuthInfo {
    return new AuthInfo(sessionStorage.getItem("LOGIN_AUTH_INFO") ?? "");
  }

  public static removeLoginInstance(): void {
    sessionStorage.removeItem("LOGIN_AUTH_INFO");
  }

  public static removeCacheInstance(): void {
    localStorage.removeItem("AUTH_INFO");
  }

  public async login() {
    const result = await this.verify();
    if (result) {
      sessionStorage.setItem("LOGIN_AUTH_INFO", this.toString());
    } else {
      throw "認証トークンに含まれるデジタル証明の検証に失敗しました。";
    }
  }

  public cache(): void {
    localStorage.setItem("AUTH_INFO", this.toString());
  }

  public async verify(): Promise<boolean> {
    const tokens = this._token.split(".");
    const data = decodeBase64URL(tokens[0]);
    const signature = decodeBase64URL(tokens[1]);
    return await verify(data, signature);
  }

  public get token(): string {
    return this._token;
  }

  public get userid(): string {
    return this._userid;
  }

  public get timestamp(): Date {
    return this._timestamp;
  }

  public toString(): string {
    return this._token;
  }
}

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
