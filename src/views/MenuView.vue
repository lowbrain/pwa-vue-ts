<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import ReloadPrompt from "@/components/ReloadPrompt.vue";

console.log("MenuView");
</script>

<template>
  <AppBar />
  <v-main> menu </v-main>
  <AppFooter />
  <ReloadPrompt />
</template>
