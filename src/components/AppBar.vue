<script setup lang="ts">
import router from "@/router";
import { mdiDotsVertical } from "@mdi/js";

const restartApp = () => {
  console.log("restart");
  router.push({ name: "home" });
};

const exitApp = () => {
  console.log("exit");
  console.log(history.length);
  history.go(history.length * -1 + 1);
  // window.close();
};
</script>

<template>
  <v-app-bar color="primary">
    <v-app-bar-title>メニュー画面</v-app-bar-title>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn :icon="mdiDotsVertical" v-bind="props" color="secondary"></v-btn>
      </template>
      <v-list>
        <v-list-item title="再起動" @click="restartApp" />
        <v-list-item title="終了" @click="exitApp" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
