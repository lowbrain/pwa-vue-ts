import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MenuView from "../views/MenuView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/menu",
      name: "menu",
      meta: {
        requiresInstall: true,
        requiresLogin: true,
      },
      component: MenuView,
    },
    {
      path: "/login",
      name: "login",
      meta: {
        requiresInstall: true,
      },
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresInstall: boolean = to.matched.some((record) => record.meta.requiresInstall);
  const requiresLogin: boolean = to.matched.some((record) => record.meta.requiresLogin);

  const isStandalone: boolean = window.matchMedia("(display-mode: standalone)").matches;
  const isLoggedIn = false;

  if (requiresInstall && !isStandalone) {
    next({ name: "home" });
  } else if (requiresLogin && !isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
