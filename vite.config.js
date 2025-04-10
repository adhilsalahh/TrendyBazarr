import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

export default defineConfig({
  plugins: [react()],
  base: '/TrendyBazarr/',
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.jsx']
  }
});