<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import AppBar from "@/components/layout/AppBar.vue";
import AppLogo from "@/components/layout/AppLogo.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import ComponentTable from "@/components/parts/ComponentTable.vue";
import ProgressOverlay from "@/components/parts/ProgressOverlay.vue";
import * as auth from "@/modules/authenticate";
import * as req from "@/modules/authrequest";

const errMsg = ref<any>(null);
const isProgress = ref<boolean>(true);
const isAlert = ref<boolean>(false);

const router = useRouter();

const tryLogin = async (isForce?: boolean) => {
  // const isAllowRequest = window.matchMedia("(display-mode: standalone)").matches || isForce;
  const isAllowRequest = true;

  // ログイン済みであったら即時メニューに遷移
  if (auth.isLoggedin()) {
    router.push({ name: "menu" });
    return;
  }

  // ログイン試行
  try {
    isProgress.value = true;
    const token = req.getToken();
    if (token.length > 0) {
      await auth.login(token);
      router.push({ name: "menu" });
    } else if (isAllowRequest) {
      await req.request();
    } else {
      isProgress.value = false;
    }
  } catch (err) {
    isProgress.value = false;
    errMsg.value = err;
    console.log(err);
  }
};

window.matchMedia("(display-mode: standalone)").addEventListener("change", () => tryLogin());
onMounted(() => tryLogin());
</script>

<template>
  <ProgressOverlay v-if="isProgress" />
  <template v-else>
    <AppBar />
    <v-main>
      <v-container>
        <v-alert v-if="isAlert" border="start" title="WARNING" variant="tonal" color="warning">
          <div class="d-flex justify-space-between ma-1 align-center">
            <div>本サイトはインストールしたサンプルアプリからの利用を推奨しております。続行しますか？</div>
            <div><v-btn @click="tryLogin(true)" color="warning">続行する</v-btn></div>
          </div>
        </v-alert>
        <v-alert v-if="errMsg" border="start" title="ERROR" variant="tonal" color="error">
          <p>{{ errMsg }}</p>
        </v-alert>
        <AppLogo />
        <v-breadcrumbs class="justify-center" color="primary">
          <v-breadcrumbs-item title="HOME" href="." />
          <v-breadcrumbs-divider />
          <v-breadcrumbs-item title="MENU" href="#" @click="isAlert = true" />
        </v-breadcrumbs>
        <ComponentTable />
      </v-container>
    </v-main>
    <AppFooter />
  </template>
</template>
