<script setup lang="ts">
import ReloadPrompt from "../components/ReloadPrompt.vue";

console.log("MenuView");
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-title>PWA-VUE-TS</v-app-bar-title>
    <v-btn icon="mdi-dots-vertical"></v-btn>
  </v-app-bar>
  <v-main> menu </v-main>
  <ReloadPrompt />
</template>
