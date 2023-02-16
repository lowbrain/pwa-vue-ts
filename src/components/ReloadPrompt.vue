<script setup lang="ts">
import { defineEmits, onMounted } from "vue";
import { useRegisterSW } from "virtual:pwa-register/vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();
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
    <span> New content available, click on reload button to update. </span>
    <v-btn color="pink" variant="text" @click="updateServiceWorker()"> Reload </v-btn>
    <v-btn color="pink" variant="text" @click="close"> Close </v-btn>
  </v-snackbar>
</template>
