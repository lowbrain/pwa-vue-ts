import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MenuView from "@/views/MenuView.vue";
import AuthInfo from "@/modules/authinfo";

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
      path: "/menu",
      name: "menu",
      meta: { requiresLogin: true },
      component: MenuView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresLogin: boolean = to.matched.some((record) => record.meta.requiresLogin);
  if (requiresLogin && !AuthInfo.isLogin()) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
