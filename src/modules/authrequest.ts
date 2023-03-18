const URL = `${location.protocol}//${location.host}${import.meta.env.BASE_URL}`;
const SERVER_URL1 = `https://first-server.azurewebsites.net/check.html`;
const SERVER_URL2 = `https://second-server.azurewebsites.net/check.html`;
const AUTH_URL = `https://first-server.azurewebsites.net/login.jsp?popup_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fpopup.jsp%3Fjump_url%3Dhttps%3A%2F%2Fsecond-server.azurewebsites.net%2Findex.jsp&auth_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fauth.jsp&return_url=https%3A%2F%2Ffirst-server.azurewebsites.net%2Fredirect.jsp&redirect_url=${URL}`;

const preConnect = async (timeout: number) => {
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
  } else {
    throw "network offline";
  }
};

export const request = async () => {
  try {
    await preConnect(60);
    window.location.href = AUTH_URL;
  } catch (err) {
    console.log(err);
    window.location.href = window.location.href + "?auth=cache";
  }
};

export const getToken = (): string => {
  let token: string = "";

  const param = new URLSearchParams(window.location.search);
  if (param.has("auth")) {
    // 受信した認証トークンを保持
    token = param.get("auth") ?? "";
  }

  return token;
};
