import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

const VERIFY_KEY: string = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArXcowXX71W/ew253zSPH
QHW4opBekTcJ4fPQ2NftsAq8BIYidfhGlucjUtckq+ZR21XtPlyoY7fY7CyJhIze
awn+DGpBXGNYiG2Pmpqz08T9QQxhum2w3bSOTYYvHZsCZ/IfMzemFJcfs5GTvW5C
F+Yk10NK9KDUpGYYai9MjtDSLPK2UfZM78momL6ugpASkCA72nYwdxM6wO8Bq22j
x8zKOaI3ffFngO0OIsOJgqz4LHt7mmJnJCiABvOHK19aqcapS+RfFWSfcx6rQIX7
xiOYNm1Q3JrqJJfYJ5TXX0hv6Av33pIefveWOZ7OWVznL2n8BvI7YNMJqSChwJ+C
QQIDAQAB
-----END PUBLIC KEY-----
`;

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env.VITE_APP_VERSION = require("./package.json").version;
  process.env.VITE_APP_VERIFY_KEY = VERIFY_KEY;
  return {
    plugins: [
      vue(),
      VitePWA({
        injectRegister: "inline",
        devOptions: { enabled: true },
        includeAssets: ["img/**/*"],
        workbox: { globPatterns: ["**/*.{js,css,html,ico,png,jpg}"] },
        manifest: {
          name: "サンプルアプリケーション名",
          short_name: "サンプルアプリ",
          categories: ["reference"],
          description: "サンプルアプリケーションの説明",
          display: "standalone",
          theme_color: "#6750A4",
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
  };
});
