<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";

const checkURL: string = "https://first-server.azurewebsites.net/check.html";
const loginURL: string = "https://first-server.azurewebsites.net/login.jsp?popup_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fpopup.jsp%3Fjump_url%3Dhttps%3A%2F%2Fsecond-server.azurewebsites.net%2Findex.jsp&auth_url=https%3A%2F%2Fsecond-server.azurewebsites.net%2Fauth.jsp&return_url=https%3A%2F%2Ffirst-server.azurewebsites.net%2Fredirect.jsp&redirect_url=" + encodeURIComponent(window.location.href);

const checkServer = async () => {
  try {
    const response = await fetch(checkURL);
    if ((await response.status) !== 200) {
      throw `response.status = ${response.status}, response.statusText = ${response.statusText}`;
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const login = (isConnect: boolean) => {
  const param: string = window.location.search;
  if (param.length === 0) {
    if (isConnect) {
      console.log("サーバに問い合わせログインします。");
      window.location.href = loginURL;
    } else {
      console.log("キャッシュを利用してログインします。");
    }
  }
};

// onMounted(() => {
//   if (window.matchMedia("(display-mode: standalone)").matches) {
//     if (navigator.onLine) {
//       console.log("online mode");
//       checkServer().then((result) => {
//         login(result);
//       });
//     } else {
//       console.log("offline mode");
//       login(false);
//     }
//   } else {
//   }

// });
</script>

<template>
  <v-app>
    <RouterView />
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
