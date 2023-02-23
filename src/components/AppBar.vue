<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { mdiDotsVertical } from "@mdi/js";

const displayReloginApp = ref(navigator.onLine);
const reloginApp = () => {
  console.log("relogin");
  router.push({ name: "home" });
};

const displayExitApp = ref(navigator.userAgent.indexOf("Android") > 0);
const exitApp = () => {
  console.log(`exit:${history.length}`);
  history.go(history.length * -1 + 1);
};
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-title>メニュー画面</v-app-bar-title>
    <v-menu location="bottom right">
      <template v-slot:activator="{ props }">
        <v-btn :icon="mdiDotsVertical" v-bind="props" color="secondary"></v-btn>
      </template>
      <v-list>
        <v-list-item v-if="displayReloginApp" title="再認証" @click="reloginApp" />
        <v-list-item v-if="displayExitApp" title="閉じる" @click="exitApp" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
