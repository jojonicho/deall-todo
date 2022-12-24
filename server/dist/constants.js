"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.DB_NAME = exports.DB_PORT = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = exports.PORT = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.BACKEND_URL = exports.COOKIE_NAME = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === "production";
exports.COOKIE_NAME = "jid";
exports.BACKEND_URL = process.env.BACKEND_URL || "http://localhost";
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "supersecretsecretaccess";
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "supersecretsecretrefresh";
exports.PORT = process.env.PORT || 8080;
exports.DB_USER = process.env.DB_USER || "postgres";
exports.DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
exports.DB_HOST = process.env.DB_HOST || "localhost";
exports.DB_PORT = process.env.DB_PORT || "5432";
exports.DB_NAME = process.env.DB_NAME || "todo-deall";
exports.DATABASE_URL = process.env.DATABASE_URL ||
    `postgres://${exports.DB_USER}:${exports.DB_PASSWORD}@${exports.DB_HOST}:${exports.DB_PORT}/${exports.DB_NAME}`;
//# sourceMappingURL=constants.js.map