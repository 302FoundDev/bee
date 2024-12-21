export { }

declare global {
  interface ImportMeta {
    env: {
      VITE_BACKEND_PORT: string;
      VITE_BACKEND_URL: string;
      VITE_FRONTEND_PORT: string;
      VITE_FRONTEND_URL: string;
    };
  }
}

export const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 5000 // Default port for the backend
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || `http://localhost:${BACKEND_PORT}`
export const FRONTEND_PORT = import.meta.env.VITE_FRONTEND_PORT || 5173 // Default port for the frontend
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || `http://localhost:${FRONTEND_PORT}`