<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import AppLogo from "@/components/AppLogo.vue";

const isBrowser = ref(window.matchMedia("(display-mode: browser)").matches);

onMounted(() => {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    router.push({ name: "menu" });
  }
});

console.log("HomeView");
</script>

<template>
  <v-main class="mx-auto">
    <v-alert v-if="isBrowser" border="start" title="WARNING" class="ma-6" variant="tonal" color="warning">
      <p>本サイトはインストールしたサンプルアプリからの利用を推奨しております。続行しますか？</p>
      <div class="text-end"><v-btn variant="plain" href="menu" class="text-end" color="warning">続行する</v-btn></div>
    </v-alert>
    <AppLogo />
    <v-sheet>
      <div>
        <p class="text-subtitle-1 text-center">本サンプルアプリは以下コンポーネントをもとに実装しています。</p>
        <v-table fixed-header height="300px">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Ver</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>vue</td>
              <td>v3.2.45</td>
            </tr>
            <tr>
              <td>vue-router</td>
              <td>v4.1.6</td>
            </tr>
            <tr>
              <td>vuetify</td>
              <td>v3.1.3</td>
            </tr>
            <tr>
              <td>typescript</td>
              <td>v4.7.4</td>
            </tr>
            <tr>
              <td>vite</td>
              <td>v4.0.0</td>
            </tr>
            <tr>
              <td>vite-plugin-pwa</td>
              <td>v0.14.1</td>
            </tr>
            <tr>
              <td>npm</td>
              <td>v8.19.3</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-sheet>
  </v-main>
</template>
