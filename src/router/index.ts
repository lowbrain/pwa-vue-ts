import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import MenuView from "../views/MenuView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/menu",
      name: "menu",
      component: MenuView,
    },
  ],
});

export default router;
