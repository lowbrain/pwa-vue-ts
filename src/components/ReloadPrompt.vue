<script setup lang="ts">
import { onMounted } from "vue";
import { useRegisterSW } from "virtual:pwa-register/vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({ immediate: true });
const emit = defineEmits<{ (e: "continue"): void }>();

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
  emit("continue");
};

onMounted(() => {
  if (!needRefresh.value) close();
});

console.log("ReloadPrompt");
</script>

<template>
  <v-snackbar v-model="needRefresh" location="bottom right" timeout="-1">
    <p>新しいコンテンツが適用可能です。今すぐアプリを再起動し適用しますか？</p>
    <p>キャンセルした場合は、次回アプリ起動時などに自動適用されます。</p>
    <div class="d-flex justify-end">
      <v-btn color="pink" variant="text" @click="updateServiceWorker()">今すぐ適用</v-btn>
      <v-btn color="pink" variant="text" @click="close">キャンセル</v-btn>
    </div>
  </v-snackbar>
</template>
