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
  <ReloadPrompt @continue="loaded" />
</template>
