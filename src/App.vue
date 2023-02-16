<script setup lang="ts">
import { RouterView } from "vue-router";
import InstallPrompt from "./components/InstallPrompt.vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";
import router from "./router";

const loaded = () => {
  const isStandalone: boolean = window.matchMedia("(display-mode: standalone)").matches;
  if (isStandalone) router.push({ name: "menu" });
};

window.matchMedia("(display-mode: standalone)").addEventListener("change", loaded);
</script>

<template>
  <v-app><RouterView /></v-app>
  <InstallPrompt />
  <ReloadPrompt @continue="loaded" />
</template>
