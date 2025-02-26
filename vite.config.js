import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        app: "./src/main.jsx",
      },
      output: {
        entryFileNames: "chatbot-demo.js",
      },
    },
  },
  base: "https://cdn.jsdelivr.net/gh/NaturaAdnyana/gemini-laravel-client-demo/dist/",
  // plugins: [react()],
});
