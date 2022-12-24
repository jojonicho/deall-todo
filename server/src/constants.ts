export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "jid";
export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost";

export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "supersecretsecretaccess";
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "supersecretsecretrefresh";

export const PORT = process.env.PORT || 8080;
export const DB_USER = process.env.DB_USER || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || "5432";
export const DB_NAME = process.env.DB_NAME || "todo-deall";
export const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
