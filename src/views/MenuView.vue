<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import ReloadPrompt from "@/components/ReloadPrompt.vue";

const slides = ["First", "Second", "Third", "Fourth", "Fifth"];

console.log("MenuView");
</script>

<template>
  <AppBar />
  <v-main>
    <v-carousel height="600" :show-arrows="false" hide-delimiter-background color="primary">
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet height="100%">
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-h2">{{ slide }} Slide</div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-main>
  <AppFooter />
  <ReloadPrompt />
</template>
