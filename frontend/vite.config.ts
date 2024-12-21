import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },

      '^/(?!(dashboard|about|dashboard/settings|settings|signin|signup)$)[a-zA-Z0-9_-]+$': {
        target: 'http://localhost:5000/urls',
        changeOrigin: true,
        rewrite: (path) => path.replace('/', ''),
      },
    },
  },
})
