import type { AuthToken } from "@/modules/authtoken";

export default class AuthInfo {
  private _userid: string;
  private _timestamp: Date;

  public constructor(param: AuthToken) {
    const parserStr = new TextDecoder().decode(param.data);
    const authXml = new DOMParser().parseFromString(parserStr, "text/xml");

    // ユーザID
    const useridTag = authXml.getElementsByTagName("userid");
    this._userid = useridTag.item(0)?.textContent ?? "";

    // タイムスタンプ
    const timestampTag = authXml.getElementsByTagName("timestamp");
    this._timestamp = new Date(timestampTag.item(0)?.textContent ?? "") ?? new Date();
  }

  public get userid(): string {
    return this._userid;
  }

  public get timestamp(): Date {
    return this._timestamp;
  }
}
