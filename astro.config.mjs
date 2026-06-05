// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// `site` drives canonical URLs, OG tags, and the generated sitemap.
// User-site repo (lucasburgett.github.io) serves at the root, so no `base` is needed.
// Swap to a custom domain here later if you add one.
export default defineConfig({
  site: "https://lucasburgett.github.io",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
