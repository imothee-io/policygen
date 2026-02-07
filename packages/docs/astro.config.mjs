// @ts-check

import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";

export default defineConfig({
  site: "https://policygen.xyz",
  integrations: [
    expressiveCode({
      themes: ["github-dark"],
    }),
    mdx(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
