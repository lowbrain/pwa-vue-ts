<script setup lang="ts">
import { RouterView } from "vue-router";
import InstallPrompt from "./components/InstallPrompt.vue";
</script>

<template>
  <v-app>
    <RouterView />
  </v-app>
  <InstallPrompt />
</template>
