import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: process.env.VITE_BACKEND_URL ? `https://bee-api-gps3.onrender.com/urls` : 'https://bee-api-gps3.onrender.com/urls',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //     '^/(?!dashboard(/settings)?$|about$|settings$|signin$|signup$)[a-zA-Z0-9_-]+$': {
  //       target: process.env.VITE_BACKEND_URL ? `https://bee-api-gps3.onrender.com/urls` : 'https://bee-api-gps3.onrender.com/urls',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace('/', ''),
  //     },
  //   },
  // },
=======
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL ? `https://bee-api-gps3.onrender.com/urls` : 'https://bee-api-gps3.onrender.com/urls',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '^/(?!dashboard(/settings)?$|about$|settings$|signin$|signup$)[a-zA-Z0-9_-]+$': {
        target: 'https://bee-api-gps3.onrender.com/urls',
        changeOrigin: true,
        rewrite: (path) => path.replace('/', ''),
      },
    },
  },
>>>>>>> 159db1bc3b3bed8f6dd2b84580fdf032993a01ab
});
