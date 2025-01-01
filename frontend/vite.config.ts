import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/(?!dashboard(/settings)?$|about$|settings$|signin$|signup$|dashboard$)[a-zA-Z0-9_-]+$': {
        target: 'bee-api-backend.vercel.app/urls',
        changeOrigin: true,
        rewrite: (path) => path.replace('/', ''),
      },
    },
  },
});
