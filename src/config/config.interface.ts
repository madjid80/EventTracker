export interface Config {
  API_SERVER_PORT?: number;
  API_SERVER_HOST?: string;
  NODE_ENV?: "development" | "production" | "test" | "local";
  LOG_LEVEL?: "error" | "warn" | "info" | "debug";
  MONGO_URL?: string;
}
