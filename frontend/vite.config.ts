import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { BACKEND_URL } from './src/constants'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },

      '^/(?!(dashboard|about|dashboard/settings|settings|signin|signup)$)[a-zA-Z0-9_-]+$': {
        target: BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace('/', ''),
      },
    },
  },
})
