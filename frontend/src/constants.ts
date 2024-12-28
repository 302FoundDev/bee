export { }

declare global {
  interface ImportMeta {
    env: {
      VITE_BACKEND_URL: string;
      VITE_FRONTEND_URL: string;
    };
  }
}

// vite.config.ts
export const BACKEND_URL = `https://bee-api-gps3.onrender.com/urls`;
export const FRONTEND_URL = `https://beeslug.vercel.app`;
