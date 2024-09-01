import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: ["lightweight-charts"],
  },
  resolve: {
    alias: {
      "lightweight-charts": "lightweight-charts",
    },
  },
});
