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
        categories: ["reference"],
        description: "サンプルアプリケーションの説明",
        display: "standalone",
        theme_color: "#6200ee",
        background_color: "#ffffff",
        lang: "ja",
        protocol_handlers: [
          {
            protocol: "web+pwavuets",
            url: "./%s",
          },
        ],
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
            src: "img/screenshot/screenshot1.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            label: "screenshot1",
          },
          {
            src: "img/screenshot/screenshot2.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            label: "screenshot2",
          },
          {
            src: "img/screenshot/screenshot3.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            label: "screenshot3",
          },
          {
            src: "img/screenshot/screenshot4.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            label: "screenshot4",
          },
          {
            src: "img/screenshot/screenshot5.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            label: "screenshot5",
          },
          {
            src: "img/screenshot/screenshot6.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            label: "screenshot6",
          },
          {
            src: "img/screenshot/screenshot6.jpg",
            sizes: "1080x1920",
            type: "image/jpg",
            label: "screenshot7",
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
