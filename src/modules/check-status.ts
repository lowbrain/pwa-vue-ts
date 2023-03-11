const SERVER_URL1: string = "https://first-server.azurewebsites.net/check.html";
const SERVER_URL2: string = "https://second-server.azurewebsites.net/check.html";

const checkServerStatus = async (timeout: number) => {
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

const isLogin = (): boolean => {
  if (sessionStorage.getItem("LOGIN_AUTH_INFO")) {
    return true;
  } else {
    return false;
  }
};

export { checkServerStatus, isLogin };
