import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE задаётся при сборке для GitHub Pages (сайт живёт в /имя-репозитория/).
// На Cloudflare Pages или своём домене остаётся "/".
export default defineConfig({
  base: process.env.BASE || "/",
  plugins: [react()],
});
