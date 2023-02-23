<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import AppLogo from "@/components/AppLogo.vue";

const startUrl = `${location.protocol}//${location.host}${import.meta.env.BASE_URL}`;

const items = [
  {
    title: "Home",
    disabled: false,
    href: `${startUrl}`,
  },
  {
    title: "Login",
    disabled: false,
    href: `${startUrl}login`,
  },
  {
    title: "Menu",
    disabled: false,
    href: `${startUrl}menu`,
  },
];

const loaded = () => {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    router.push({ name: "menu" });
  }
};

window.matchMedia("(display-mode: standalone)").addEventListener("change", loaded);
onMounted(() => loaded());

console.log("HomeView");
</script>

<template>
  <v-main class="mx-auto">
    <AppLogo />
    <v-sheet>
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
  </v-main>
</template>
