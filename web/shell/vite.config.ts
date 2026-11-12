import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { isolatePortals } from './plugins/isolate-portals.ts';

export default defineConfig({
  plugins: [react(), tailwindcss(), isolatePortals()],
  test: { environment: 'jsdom', css: false },
});
