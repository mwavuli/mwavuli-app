// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Static output (default), extensionless directory URLs (build.format 'directory',
// default). The production domain is an open brand decision (D4, brand/00-inventory.md),
// so `site` is the reserved .example placeholder until it is confirmed.
export default defineConfig({
  site: 'https://mwavuli.example',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
