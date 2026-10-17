// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://ephread.com",
  // Existing URLs all end with a slash (/the-bell/, /abjapp/en/, …).
  trailingSlash: "always",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
