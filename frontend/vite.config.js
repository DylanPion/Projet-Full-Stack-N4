import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://nextudrive.fr",
        //target: "http://localhost:8080",
        changeOrigin: true,
      },
      // "/api/mailer": {
      //   target: "http://localhost:9090", // URL pour le mailer
      //   changeOrigin: true,
      // },
    },
  },
});
