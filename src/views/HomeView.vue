<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import AppBar from "@/components/layout/AppBar.vue";
import AppLogo from "@/components/layout/AppLogo.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import ComponentTable from "@/components/parts/ComponentTable.vue";
import ProgressOverlay from "@/components/parts/ProgressOverlay.vue";
import { isLogin, checkServer, authTokenUrl } from "@/modules/login";

const msg = ref<String>("");

const isProgress = ref<boolean>(true);

const login = async (isForce: boolean) => {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  msg.value = "";
  isProgress.value = false;

  try {
    if (isStandalone || isForce) {
      isProgress.value = true;
      if (navigator.onLine) {
        await checkServer(60);
        window.location.href = authTokenUrl;
      } else {
        window.location.href = window.location.href + "?auth=cache";
      }
    }
  } catch (err) {
    msg.value = "ERROR";
    isProgress.value = false;
  }
};

const forceLoginMsg = () => (msg.value = "FORCE");

window.matchMedia("(display-mode: standalone)").addEventListener("change", () => login(false));

onMounted(async () => {
  try {
    const param = new URLSearchParams(window.location.search);
    if (await isLogin(param.get("auth") ?? "")) {
      router.push({ name: "menu" });
    } else {
      login(false);
    }
  } catch (err) {
    msg.value = "ERROR";
    isProgress.value = false;
    console.log(err);
  }
});
</script>

<template>
  <template v-if="!isProgress">
    <AppBar />
    <v-main>
      <v-container>
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
        <v-breadcrumbs class="justify-center" color="primary">
          <v-breadcrumbs-item title="HOME" href="." />
          <v-breadcrumbs-divider />
          <v-breadcrumbs-item title="MENU" href="#" @click="forceLoginMsg()" />
        </v-breadcrumbs>
        <ComponentTable />
      </v-container>
    </v-main>
    <AppFooter />
  </template>
  <ProgressOverlay v-else />
</template>
