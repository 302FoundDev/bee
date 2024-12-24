/* eslint-disable prettier/prettier */
process.loadEnvFile();

export const {
  PORT = 5000,
  NODE_ENV = 'development',
} = process.env;

export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
