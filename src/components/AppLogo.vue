<script setup lang="ts">
const startUrl = `${location.protocol}//${location.host}${import.meta.env.BASE_URL}`;

const items = [
  {
    title: "Home",
    disabled: false,
    href: `${startUrl}`,
  },
  {
    title: "Login",
    disabled: false,
    href: `${startUrl}login`,
  },
  {
    title: "Menu",
    disabled: false,
    href: `${startUrl}menu`,
  },
];
</script>

<template>
  <v-sheet class="mt-8">
    <v-img src="/img/icon/android-chrome-512x512.png" width="256" height="256" class="mx-auto" />
    <div class="text-h4 font-weight-bold text-center mt-6">サンプルアプリ</div>
    <v-breadcrumbs :items="items" class="justify-center" color="primary"></v-breadcrumbs>
  </v-sheet>
</template>
