// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// `site` drives canonical URLs, OG tags, and the generated sitemap.
// Custom domain (lucasburgett.com) is served from the lucasburgett.github.io Pages
// repo at the root via the public/CNAME file, so no `base` is needed.
export default defineConfig({
  site: "https://lucasburgett.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
