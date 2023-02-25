<script setup lang="ts">
import { onMounted, reactive } from "vue";
import router from "@/router";
import { checkServerStatus } from "@/modules/check-status";
import AppLogo from "@/components/AppLogo.vue";
import ProgressOverlay from "@/components/ProgressOverlay.vue";
import AuthInfo from "@/modules/authinfo";

const returnUrl = `${location.protocol}//${location.host}${import.meta.env.BASE_URL}login`;

// eslint-disable-next-line prettier/prettier
const loginURL: string = "https://first-server.azurewebsites.net/login.jsp?popup_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fpopup.jsp%3Fjump_url%3Dhttps%3A%2F%2Fsecond-server.azurewebsites.net%2Findex.jsp&auth_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fauth.jsp&return_url=https%3A%2F%2Ffirst-server.azurewebsites.net%2Fredirect.jsp&redirect_url=" + returnUrl;

const errMsg = reactive({
  isError: false,
  message: "",
});

onMounted(async () => {
  const param = new URLSearchParams(window.location.search);
  console.log(param.get("auth"));
  if (param.has("auth")) {
    console.log("ログインが完了しました。");
    try {
      const authInfo = new AuthInfo(param.get("auth") ?? "");
      authInfo.cache();
      authInfo.login();
      router.push({ name: "menu" });
    } catch (err: any) {
      errMsg.isError = true;
      errMsg.message = err;
    }
  } else if (navigator.onLine) {
    console.log("サーバに問い合わせログインします。");
    try {
      await checkServerStatus(10);
      window.location.href = loginURL;
    } catch (err: any) {
      errMsg.isError = true;
      errMsg.message = err;
    }
  } else {
    console.log("キャッシュを利用してログインします。");
    window.location.href = window.location.href + "?auth=cache";
  }
});
</script>

<template>
  <v-main class="mx-auto">
    <template v-if="errMsg.isError">
      <v-alert border="start" class="ma-6" title="ERROR" color="error">
        <p>サーバに接続できませんでした。</p>
        <p>{{ errMsg.message }}</p>
      </v-alert>
      <AppLogo />
    </template>
    <ProgressOverlay v-else />
  </v-main>
</template>
