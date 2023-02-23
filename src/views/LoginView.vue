<script setup lang="ts">
import { onMounted, reactive } from "vue";
import router from "@/router";
import { checkServerStatus } from "@/modules/check-status";
import AppLogo from "@/components/AppLogo.vue";
import ProgressOverlay from "@/components/ProgressOverlay.vue";

const returnUrl = `${location.protocol}//${location.host}${import.meta.env.BASE_URL}login`;

// eslint-disable-next-line prettier/prettier
const loginURL: string = "https://first-server.azurewebsites.net/login.jsp?popup_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fpopup.jsp%3Fjump_url%3Dhttps%3A%2F%2Fsecond-server.azurewebsites.net%2Findex.jsp&auth_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fauth.jsp&return_url=https%3A%2F%2Ffirst-server.azurewebsites.net%2Fredirect.jsp&redirect_url=" + returnUrl;

const errMsg = reactive({
  isError: false,
  message: "",
});

onMounted(() => {
  if (window.location.search.length !== 0) {
    console.log("authentication process");
    router.push({ name: "menu" });
  } else {
    if (navigator.onLine) {
      console.log("サーバに問い合わせログインします。");
      checkServerStatus(10)
        .then(() => {
          window.location.href = loginURL;
        })
        .catch((err) => {
          errMsg.isError = true;
          errMsg.message = err;
        });
    } else {
      console.log("キャッシュを利用してログインします。");
      window.location.href = window.location.href + "?auth=cache";
    }
  }
});

console.log("LoginView");
</script>

<template>
  <v-main class="mx-auto">
    <v-alert v-if="errMsg.isError" border="start" class="ma-6" title="ERROR" color="error">
      <p>サーバに接続できませんでした。</p>
      <p>{{ errMsg.message }}</p>
    </v-alert>
    <ProgressOverlay v-else />
    <AppLogo />
  </v-main>
</template>
