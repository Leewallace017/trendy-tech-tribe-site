import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://trendytechtribe.com',
  integrations: [mdx(), sitemap()],
  adapter: vercel(),

  // Astro 5.0 optimizations
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto',
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'astro-core': ['astro:content'],
          }
        }
      }
    }
  }
});
