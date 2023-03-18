import AuthInfo from "@/modules/authinfo";
import AuthToken from "@/modules/authtoken";
import getToken from "@/modules/login";

const STORAGE_NAME = "AUTH_TOKEN";

export const isLoggedin = (): boolean => {
  return sessionStorage.getItem(STORAGE_NAME) ? true : false;
};

export const login = async (): Promise<boolean> => {
  let result: boolean = false;

  let unverifyToken: string = await getToken();
  if (unverifyToken === "cache") {
    if (localStorage.getItem(STORAGE_NAME)) {
      unverifyToken = localStorage.getItem(STORAGE_NAME) ?? "";
    } else {
      throw "認証情報がキャッシュされていないため、キャッシュログインできません。";
    }
  }

  if (unverifyToken.length > 0) {
    try {
      const authToken = new AuthToken(unverifyToken);
      if (await authToken.verify()) {
        localStorage.setItem(STORAGE_NAME, unverifyToken);
        sessionStorage.setItem(STORAGE_NAME, unverifyToken);
        result = true;
      } else {
        throw "認証トークンが誤っています。";
      }
    } catch (err) {
      throw "認証トークンの検証に失敗しました。¥n" + err;
    }
  }

  return result;
};

export const logout = (isForce?: boolean) => {
  sessionStorage.removeItem(STORAGE_NAME);
  if (isForce) localStorage.removeItem(STORAGE_NAME);
};

export const genAuthInfo = (): AuthInfo => {
  const token = sessionStorage.getItem(STORAGE_NAME) ?? "";
  if (token.length === 0) throw "ログインしていないため認証情報が生成できません。";
  return new AuthInfo(new AuthToken(token));
};
