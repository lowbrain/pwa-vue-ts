<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppBar from "@/components/layout/AppBar.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import ReloadPrompt from "@/components/prompt/ReloadPrompt.vue";
import type AuthInfo from "@/modules/authinfo";
import * as auth from "@/modules/authenticate";

const slides = ["1st", "2nd", "3rd", "4th", "5th"];

const authInfo: AuthInfo = auth.genAuthInfo();
const time = ref(new Date());

const router = useRouter();
const timeout: number = 5 * 60 * 1000;

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    if (sessionStorage.getItem("LAST_TIME")) {
      let lastTime: number = Number(sessionStorage.getItem("LAST_TIME"));
      if (Date.now() - lastTime >= timeout) {
        alert("一定時間が経過したため再認証してください。");
        auth.logout();
        router.push({ name: "home" });
      }
      time.value = new Date(lastTime);
    }
  } else {
    sessionStorage.setItem("LAST_TIME", String(Date.now()));
  }
});
</script>

<template>
  <AppBar />
  <v-main>
    <v-container>
      <v-carousel height="600" :show-arrows="false" hide-delimiter-background color="primary">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet height="100%">
            <div class="d-flex flex-column fill-height justify-center align-center">
              <div class="text-h2">{{ slide }} Slide</div>
              <div class="mt-6">{{ authInfo.userid }}</div>
              <div>LOGIN_TIME:{{ authInfo.timestamp.toLocaleString() }}</div>
              <div>LAST_TIME:{{ time.toLocaleString() }}</div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </v-main>
  <AppFooter />
  <ReloadPrompt />
</template>
