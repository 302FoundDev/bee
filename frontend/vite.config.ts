/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `${import.meta.env.VITE_BACKEND_URL}/urls`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '^/(?!dashboard(/settings)?$|about$|settings$|signin$|signup$)[a-zA-Z0-9_-]+$': {
        target: `${import.meta.env.VITE_BACKEND_URL}/urls`,
        changeOrigin: true,
        rewrite: (path) => path.replace('/', ''),
      },
    },
  },
});
