<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import ReloadPrompt from "@/components/ReloadPrompt.vue";
import { checkServerStatus } from "@/modules/check-status";

const items = [
  {
    title: "Home",
    disabled: false,
    href: "web+pvt://",
  },
  {
    title: "Login",
    disabled: false,
    href: "web+pvtlogin://",
  },
  {
    title: "Menu",
    disabled: false,
    href: "web+pvtmenu://",
  },
];

const loaded = () => {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    checkServerStatus(10)
      .then(() => {
        router.push({ name: "menu" });
      })
      .catch((err) => {
        console.log(err);
        alert("サーバに接続できませんでした。");
        router.push({ name: "menu" });
      });
  }
};

window.matchMedia("(display-mode: standalone)").addEventListener("change", loaded);
onMounted(() => loaded());

console.log("HomeView");
</script>

<template>
  <v-sheet class="mx-auto mt-8" color="background">
    <v-img src="/img/icon/android-chrome-512x512.png" width="256" height="256" class="mx-auto" />
    <div class="text-h4 font-weight-bold text-center mt-6">サンプルアプリ</div>
    <v-breadcrumbs :items="items" class="justify-center" color="primary"></v-breadcrumbs>
    <div class="text-subtitle-1">
      本サンプルアプリは以下コンポーネントをもとに実装しています。
      <ul class="ml-6 font-weight-light">
        <li>vue v3.2.45</li>
        <li>vue-router v4.1.6</li>
        <li>vuetify v3.1.3</li>
        <li>typescript v4.7.4</li>
        <li>vite v4.0.0</li>
        <li>vite-plugin-pwa v0.14.1</li>
        <li>npm v8.19.3</li>
      </ul>
    </div>
  </v-sheet>
</template>
