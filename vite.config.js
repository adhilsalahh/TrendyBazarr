import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/TrendyBazarr/',
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
});