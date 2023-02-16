<script setup lang="ts">
import { onMounted } from "vue";
import router from "../router";

const checkURL: string = "https://first-server.azurewebsites.net/check.html";
// eslint-disable-next-line prettier/prettier
const loginURL: string = "https://first-server.azurewebsites.net/login.jsp?popup_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fpopup.jsp%3Fjump_url%3Dhttps%3A%2F%2Fsecond-server.azurewebsites.net%2Findex.jsp&auth_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fauth.jsp&return_url=https%3A%2F%2Ffirst-server.azurewebsites.net%2Fredirect.jsp&redirect_url=" + encodeURIComponent(window.location.href);

const checkServer = async (): Promise<boolean> => {
  try {
    const response = await fetch(checkURL);
    if ((await response.status) !== 200) {
      throw `response.status = ${response.status}, response.statusText = ${response.statusText}`;
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const login = (isConnect: boolean) => {
  if (isConnect) {
    console.log("サーバに問い合わせログインします。");
    window.location.href = loginURL;
  } else {
    console.log("キャッシュを利用してログインします。");
    window.location.href = window.location.href + "?auth=cache";
  }
};

onMounted(() => {
  if (window.location.search.length !== 0) {
    console.log("authentication process");
    router.push({ name: "menu" });
  } else if (navigator.onLine) {
    console.log("online authentication mode");
    checkServer().then((result) => login(result));
  } else {
    console.log("offline authentication mode");
    login(false);
  }
});

console.log("LoginView");
</script>

<template>login</template>
