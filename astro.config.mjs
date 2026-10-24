// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://ephread.com",
  // Existing URLs all end with a slash (/the-bell/, /abjapp/en/, …).
  trailingSlash: "always",
  // Case studies that were removed from the site; old links land on the work list instead.
  redirects: {
    "/work/genetrainer/": "/#work",
    "/work/how-many-sleeps/": "/#work",
    "/work/mynox/": "/#work",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
