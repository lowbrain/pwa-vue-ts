<script setup lang="ts">
const appVersion = import.meta.env.VITE_APP_VERSION;
</script>

<template>
  <v-footer app class="d-flex justify-space-between">
    <div></div>
    <div>{{ new Date().getFullYear() }} — <strong>sample</strong></div>
    <div class="font-weight-light">v {{ appVersion }}</div>
  </v-footer>
</template>
