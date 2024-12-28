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
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || `http://localhost:5000`;
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || `https://beeslug.vercel.app`;
