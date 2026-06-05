// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Update `site` to the final domain before deploying — used for canonical URLs,
// OG tags, and the generated sitemap.
export default defineConfig({
  site: "https://lucasburgett.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
