<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";

// eslint-disable-next-line prettier/prettier
const loginURL: string = "https://first-server.azurewebsites.net/login.jsp?popup_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fpopup.jsp%3Fjump_url%3Dhttps%3A%2F%2Fsecond-server.azurewebsites.net%2Findex.jsp&auth_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fauth.jsp&return_url=https%3A%2F%2Ffirst-server.azurewebsites.net%2Fredirect.jsp&redirect_url=" + encodeURIComponent(window.location.href);

onMounted(() => {
  if (window.location.search.length !== 0) {
    console.log("authentication process");
    router.push({ name: "menu" });
  } else if (navigator.onLine) {
    console.log("サーバに問い合わせログインします。");
    window.location.href = loginURL;
  } else {
    console.log("キャッシュを利用してログインします。");
    window.location.href = window.location.href + "?auth=cache";
  }
});

console.log("LoginView");
</script>

<template>login</template>
