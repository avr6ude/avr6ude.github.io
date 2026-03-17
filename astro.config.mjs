import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://avrdu.de",
  output: "static",
  integrations: [sitemap()],

  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },

  adapter: cloudflare(),
});