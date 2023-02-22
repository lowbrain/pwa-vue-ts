<script setup lang="ts">
import appVersion from "@/modules/appversion";
</script>

<template>
  <v-footer class="d-flex align-end justify-space-between" color="background">
    <div></div>
    <div>{{ new Date().getFullYear() }} — <strong>sample</strong></div>
    <div class="font-weight-light">v {{ appVersion }}</div>
  </v-footer>
</template>
