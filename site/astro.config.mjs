// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Static output (default), extensionless directory URLs (build.format 'directory',
// default). `site` is the address the site answers on: canonical links, the sitemap and the
// social image follow it. The bare domain redirects to it (M14 in docs/design/site-infrastructure.md).
export default defineConfig({
  site: 'https://www.mwavuli.co',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
