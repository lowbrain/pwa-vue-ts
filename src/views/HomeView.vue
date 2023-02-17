<script setup lang="ts">
import ReloadPrompt from "../components/ReloadPrompt.vue";
import router from "../router";

const loaded = () => {
  if (window.matchMedia("(display-mode: standalone)").matches) router.push({ name: "menu" });
};
window.matchMedia("(display-mode: standalone)").addEventListener("change", loaded);

console.log("HomeView");
</script>

<template>
  <span>Home</span>
  <a href="web+pwavuets://">home</a>
  <a href="web+pwavuets://menu">menu</a>
  <ReloadPrompt @continue="loaded" />
</template>
