import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { BACKEND_URL } from './src/constants';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: BACKEND_URL ? `${BACKEND_URL}/urls` : 'https://bee-api-gps3.onrender.com/urls',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '^/(?!dashboard(/settings)?$|about$|settings$|signin$|signup$)[a-zA-Z0-9_-]+$': {
        target: BACKEND_URL ? `${BACKEND_URL}/urls` : 'https://bee-api-gps3.onrender.com/urls',
        changeOrigin: true,
        rewrite: (path) => path.replace('/', ''),
      },
    },
  },
});
