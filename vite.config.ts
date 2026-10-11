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

export default defineConfig({
  plugins: [themeTokens(), react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts']
  }
});
