<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import AppLogo from "@/components/layout/AppLogo.vue";
import ComponentTable from "@/components/parts/ComponentTable.vue";

const isBrowser = ref(window.matchMedia("(display-mode: browser)").matches);

onMounted(() => {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    router.push({ name: "menu" });
  }
});
</script>

<template>
  <v-main>
    <v-container>
      <v-alert v-if="isBrowser" border="start" title="WARNING" variant="tonal" color="warning">
        <p>本サイトはインストールしたサンプルアプリからの利用を推奨しております。続行しますか？</p>
        <div class="text-end"><v-btn variant="plain" href="menu" class="text-end" color="warning">続行する</v-btn></div>
      </v-alert>
      <AppLogo />
      <ComponentTable />
    </v-container>
  </v-main>
</template>
