import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@config": path.resolve(__dirname, "src/config"),
      "@utilities": path.resolve(__dirname, "src/utilities"),
      "@db": path.resolve(__dirname, "src/db"),
    },
  },
  test: {
    environment: "node",
  },
});