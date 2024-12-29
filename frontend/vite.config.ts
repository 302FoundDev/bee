import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
=======

>>>>>>> e71fc77833942b1562de21ac8fbb2cb547d253d3
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: process.env.VITE_BACKEND_URL ? `https://bee-api-gps3.onrender.com/urls` : 'https://bee-api-gps3.onrender.com/urls',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //     '^/(?!dashboard(/settings)?$|about$|settings$|signin$|signup$)[a-zA-Z0-9_-]+$': {
<<<<<<< HEAD
  //       target: 'https://bee-api-gps3.onrender.com/urls',
=======
  //       target: process.env.VITE_BACKEND_URL ? `https://bee-api-gps3.onrender.com/urls` : 'https://bee-api-gps3.onrender.com/urls',
>>>>>>> e71fc77833942b1562de21ac8fbb2cb547d253d3
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace('/', ''),
  //     },
  //   },
  // },
});
