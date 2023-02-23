import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MenuView from "@/views/MenuView.vue";
import LoginView from "@/views/LoginView.vue";
import { checkAuthInfo } from "@/modules/check-status";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      alias: "/index.html",
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/menu",
      name: "menu",
      meta: { requiresLogin: true },
      component: MenuView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresLogin: boolean = to.matched.some((record) => record.meta.requiresLogin);

  if (requiresLogin && !checkAuthInfo()) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
