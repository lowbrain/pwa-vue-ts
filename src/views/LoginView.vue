<script setup lang="ts">
import ReloadPrompt from "../components/ReloadPrompt.vue";

const login = () => {
  console.log("loginlogin");
};
</script>

<template>
  <ReloadPrompt @continue="login" />
</template>
