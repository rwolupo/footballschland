import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://footballschland.media',
  output: 'server',
  adapter: netlify(),
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    sanity({
      projectId: 'k31tvjv8',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/studio',
    }),
  ],
});
