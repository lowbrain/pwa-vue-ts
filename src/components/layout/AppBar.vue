<script setup lang="ts">
import router from "@/router";
import { mdiDotsVertical } from "@mdi/js";
import AuthInfo from "@/modules/authinfo";

const reloginApp = (force: boolean) => {
  AuthInfo.removeLoginInstance();
  if (force) AuthInfo.removeCacheInstance();
  router.push({ name: "home" });
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
        <v-list-item title="初期化" @click="reloginApp(true)" />
        <v-list-item title="再認証" @click="reloginApp(false)" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
