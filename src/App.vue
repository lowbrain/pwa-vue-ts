<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import ReloadPrompt from "./ReloadPrompt.vue";

onMounted(() => {
  if (navigator.onLine) {
    console.log("online mode");
  } else {
    console.log("offline mode");
  }
});
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>PWA-VUE-TS</v-app-bar-title>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <a href="https://popup.azurewebsites.net/popup.jsp?url=https%3A%2F%2Flowbrain.github.io%2Fpwa-vue-ts%2F"> jump </a>
      </v-container>
    </v-main>
  </v-app>
  <!-- <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <ReloadPrompt /> -->
</template>
