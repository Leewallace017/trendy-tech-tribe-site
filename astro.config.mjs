import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://trendytechtribe.com',
  integrations: [
    mdx(),
    sitemap(),
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Trendy Tech Tribe',
        short_name: 'Trendy Tech',
        description: 'Your source for tech news, AI insights, EV updates, energy policy, market analysis, and product reviews.',
        theme_color: '#0a0614',
        background_color: '#0a0614',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        navigateFallback: '/404',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        maximumFileSizeToCacheInBytes: 5000000,
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/404$/],
      }
    })
  ],
  adapter: vercel(),

  // Astro 5.0 optimizations
  compressHTML: true,

  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    format: ['webp'],
    quality: 100,
  },

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
