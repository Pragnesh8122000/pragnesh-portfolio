/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { themeCss } from './src/design/tokens.ts';

// Inlines theme tokens as CSS variables so the first paint already has the right colors.
function themeTokens(): Plugin {
  return {
    name: 'theme-tokens',
    transformIndexHtml: () => [
      { tag: 'style', attrs: { id: 'theme-tokens' }, children: themeCss(), injectTo: 'head-prepend' }
    ]
  };
}

// Preloads the hashed web font so it arrives with the CSS instead of after it.
function preloadFont(): Plugin {
  return {
    name: 'preload-font',
    transformIndexHtml: (_html, ctx) =>
      Object.keys(ctx.bundle ?? {})
        .filter((file) => file.endsWith('.woff2'))
        .map((file) => ({
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${file}`, crossorigin: '' },
          injectTo: 'head' as const
        }))
  };
}

export default defineConfig({
  plugins: [themeTokens(), preloadFont(), react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts']
  }
});
