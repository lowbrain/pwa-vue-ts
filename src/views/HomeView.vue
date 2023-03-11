<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import AppLogo from "@/components/layout/AppLogo.vue";
import ComponentTable from "@/components/parts/ComponentTable.vue";
import ProgressOverlay from "@/components/parts/ProgressOverlay.vue";
import AuthInfo from "@/modules/authinfo";
import { checkServerStatus } from "@/modules/check-status";

const msg = ref<String>("");

const isProgress = ref<boolean>(true);

const returnUrl = `${location.protocol}//${location.host}${import.meta.env.BASE_URL}`;

// eslint-disable-next-line prettier/prettier
const loginURL = "https://first-server.azurewebsites.net/login.jsp?popup_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fpopup.jsp%3Fjump_url%3Dhttps%3A%2F%2Fsecond-server.azurewebsites.net%2Findex.jsp&auth_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fauth.jsp&return_url=https%3A%2F%2Ffirst-server.azurewebsites.net%2Fredirect.jsp&redirect_url=" + returnUrl;

const l = async () => {
  const param = new URLSearchParams(window.location.search);
  console.log(param.get("auth"));
  if (param.has("auth")) {
    console.log("ログインが完了しました。");
    try {
      const authInfo = new AuthInfo(param.get("auth") ?? "");
      authInfo.cache();
      await authInfo.login();
      router.push({ name: "menu" });
    } catch (err: any) {
      msg.value = "ERROR";
      isProgress.value = false;
    }
  } else if (navigator.onLine) {
    console.log("サーバに問い合わせログインします。");
    try {
      await checkServerStatus(10);
      window.location.href = loginURL;
    } catch (err: any) {
      msg.value = "ERROR";
      isProgress.value = false;
    }
  } else {
    console.log("キャッシュを利用してログインします。");
    window.location.href = window.location.href + "?auth=cache";
  }
};

const login = (isForce: boolean) => {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  msg.value = "";
  if (AuthInfo.isLogin()) {
    router.push({ name: "menu" });
  } else if (isStandalone || isForce) {
    isProgress.value = true;
    l();
  } else {
    isProgress.value = false;
    msg.value = "FORCE";
  }
};

window.matchMedia("(display-mode: standalone)").addEventListener("change", () => login(false));
onMounted(() => login(false));
</script>

<template>
  <v-main>
    <v-container>
      <template v-if="!isProgress">
        <v-alert v-if="msg === 'FORCE'" border="start" title="WARNING" variant="tonal" color="warning">
          <p>本サイトはインストールしたサンプルアプリからの利用を推奨しております。続行しますか？</p>
          <div class="text-end">
            <v-btn variant="plain" @click="login(true)" class="text-end" color="warning">続行する</v-btn>
          </div>
        </v-alert>
        <v-alert v-if="msg === 'ERROR'" border="start" title="ERROR" variant="tonal" color="error">
          <p>サーバに接続できませんでした。</p>
        </v-alert>
        <AppLogo />
        <ComponentTable />
      </template>
      <ProgressOverlay v-else />
    </v-container>
  </v-main>
</template>
