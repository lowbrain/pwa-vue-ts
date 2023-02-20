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

<template>
  <v-sheet class="mx-auto mt-8" color="background">
    <v-img src="/img/icon/android-chrome-512x512.png" width="256" height="256" class="mx-auto" />
    <div class="text-h4 font-weight-bold text-center mt-6">サンプルアプリ</div>
  </v-sheet>
</template>
