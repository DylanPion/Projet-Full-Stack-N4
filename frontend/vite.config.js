import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": {
        //target: "http://spring-boot-container:8080/", // met en commun le port de l'url du front avec le back pour éviter le CROSS
        target: "http://backend-service.fullstack-n4:8080",
        changeOrigin: true,
      },
    },
  },
});
