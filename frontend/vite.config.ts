import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL ? `${process.env.VITE_BACKEND_URL}/urls` : 'http://localhost:5000/urls',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '^/(?!(dashboard|about|dashboard/settings|settings|signin|signup)$)[a-zA-Z0-9_-]+$': {
        target: process.env.VITE_BACKEND_URL ? `${process.env.VITE_BACKEND_URL}/urls` : 'http://localhost:5000/urls',
        changeOrigin: true,
        rewrite: (path) => path.replace('/', ''),
      },
    },
  },
});
