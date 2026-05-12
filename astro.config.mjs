// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: [
        "@prisma/client",
        "@prisma/adapter-pg",
        "@supabase/supabase-js",
      ],
    },
  },

  output: "server",
  adapter: vercel(),
});
