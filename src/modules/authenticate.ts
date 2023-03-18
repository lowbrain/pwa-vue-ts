import AuthInfo from "@/modules/authinfo";
import AuthToken from "@/modules/authtoken";

const STORAGE_NAME = "AUTH_TOKEN";

export const isLoggedin = (): boolean => {
  return sessionStorage.getItem(STORAGE_NAME) ? true : false;
};

export const login = async (token: string) => {
  let unverifyToken: string = token;
  if (unverifyToken === "cache") {
    if (localStorage.getItem(STORAGE_NAME)) {
      unverifyToken = localStorage.getItem(STORAGE_NAME) ?? "";
    } else {
      throw "認証情報がキャッシュされていないため、キャッシュログインできません。";
    }
  }

  try {
    const authToken = new AuthToken(unverifyToken);
    if (await authToken.verify()) {
      localStorage.setItem(STORAGE_NAME, unverifyToken);
      sessionStorage.setItem(STORAGE_NAME, unverifyToken);
    } else {
      throw "認証トークンが誤っています。";
    }
  } catch (err) {
    throw "認証トークンの検証に失敗しました。¥n" + err;
  }
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
