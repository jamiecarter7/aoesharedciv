import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  base: "/aoesharedcivbonus",
  site: "https://maybelatergames.co.uk/aoesharedcivbonus",
  integrations: [tailwind(), solidJs(), sitemap()],
});
