import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";
import { loadEnv } from "vite";

const mode = process.argv.includes("dev") ? "development" : "production";
const site =
  process.env.SITE_URL ||
  loadEnv(mode, process.cwd(), "").SITE_URL ||
  undefined;

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  integrations: site
    ? [
        sitemap({
          i18n: { defaultLocale: "es", locales: { es: "es", en: "en" } },
        }),
      ]
    : [],
  vite: { plugins: [tailwind()] },
  devToolbar: { enabled: false },
});
