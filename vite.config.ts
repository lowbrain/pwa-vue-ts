import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      devOptions: { enabled: true },
      includeAssets: ["img/**/*"],
      workbox: { globPatterns: ["**/*.{js,css,html,ico,png,svg}"] },
      manifest: {
        name: "pwa-vue-ts",
        short_name: "PVT",
        description: "pwa-vue-ts",
        theme_color: "#000000",
        background_color: "#000000",
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
