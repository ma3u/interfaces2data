import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/interfaces2data/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        de: resolve(__dirname, 'de.html'),
      },
    },
  },
});
