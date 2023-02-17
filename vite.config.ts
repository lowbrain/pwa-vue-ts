import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: "inline",
      devOptions: { enabled: true },
      includeAssets: ["img/**/*"],
      workbox: { globPatterns: ["**/*.{js,css,html,ico,png,svg}"] },
      manifest: {
        name: "サンプルアプリケーション名",
        short_name: "サンプルアプリ",
        description: "サンプルアプリケーションの説明",
        display: "standalone",
        theme_color: "#6200ee",
        background_color: "#ffffff",
        lang: "ja",
        icons: [
          {
            src: "img/icon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "img/icon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "img/icon/maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "img/icon/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "img/screenshots/screenshot1.png",
            sizes: "292x600",
            type: "image/png",
            label: "screenshot1",
          },
          {
            src: "img/screenshots/screenshot2.png",
            sizes: "292x600",
            type: "image/png",
            label: "screenshot2",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
