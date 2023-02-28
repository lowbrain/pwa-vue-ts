<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";

const isInstallAble = ref<boolean>(false);

let deferredPrompt: any | null = null;

window.addEventListener("beforeinstallprompt", (event: any) => {
  event.preventDefault();
  deferredPrompt = event;
  isInstallAble.value = true;
});

const installApp = async () => {
  if (deferredPrompt) deferredPrompt.prompt();
};

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  isInstallAble.value = false;
});

window.matchMedia("(display-mode: standalone)").addEventListener("change", () => {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    router.push({ name: "menu" });
  }
});
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="isInstallAble" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5"> インストールダイアログのタイトル </v-card-title>
        <v-card-text>インストールダイアログの説明</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="installApp"> Install </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
