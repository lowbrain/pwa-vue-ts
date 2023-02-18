<script setup lang="ts">
import { mdiDotsVertical } from "@mdi/js";
import ReloadPrompt from "../components/ReloadPrompt.vue";
const mdiDotsVIcon = mdiDotsVertical;
console.log("MenuView");
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-title>PWA-VUE-TS</v-app-bar-title>
    <v-btn :icon="mdiDotsVIcon"></v-btn>
  </v-app-bar>
  <v-main> menu </v-main>
  <ReloadPrompt />
</template>
