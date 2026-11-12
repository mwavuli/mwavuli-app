import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The manifest is how scripts/check-chunks.mjs sees which chunks load when.
  build: { manifest: true },
  test: { environment: 'jsdom', css: false },
});
