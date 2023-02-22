<script setup lang="ts">
import { onMounted,ref } from "vue";
import router from "@/router";
import { checkServerStatus } from "@/modules/check-status";
import AppLogo from "@/components/AppLogo.vue";
import ProgressOverlay from "@/components/ProgressOverlay.vue";

// eslint-disable-next-line prettier/prettier
const loginURL: string = "https://first-server.azurewebsites.net/login.jsp?popup_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fpopup.jsp%3Fjump_url%3Dhttps%3A%2F%2Fsecond-server.azurewebsites.net%2Findex.jsp&auth_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fauth.jsp&return_url=https%3A%2F%2Ffirst-server.azurewebsites.net%2Fredirect.jsp&redirect_url=" + encodeURIComponent(window.location.href);

const errMsg: any = ref(null);

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
          errMsg.value = `サーバに接続できませんでした。${err}`;
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
    <AppLogo />
    <v-alert class="ma-6" v-if="errMsg" title="エラー" type="error" :text="errMsg" />
  </v-main>
  <ProgressOverlay />
</template>
