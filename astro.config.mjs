// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Update this to your final domain when you connect one in Cloudflare Pages.
  site: 'https://rotaract-website-7gs.pages.dev',
  integrations: [sitemap()],
});
