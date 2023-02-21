<script setup lang="ts">
import { RouterView } from "vue-router";
import appVersion from "@/modules/appversion";
import InstallPrompt from "@/components/InstallPrompt.vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";
let item: string = "" + sessionStorage.getItem("name");
console.log(item);
sessionStorage.setItem("name", item + "太郎");
</script>

<template>
  <v-app>
    <RouterView />
    <v-footer class="d-flex align-end justify-space-between" color="background">
      <div></div>
      <div>{{ new Date().getFullYear() }} — <strong>sample</strong></div>
      <div class="font-weight-light">v {{ appVersion }}</div>
    </v-footer>
  </v-app>
  <InstallPrompt />
  <ReloadPrompt />
</template>
