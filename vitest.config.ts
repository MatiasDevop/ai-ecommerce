import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["__tests__/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    css: false,
    restoreMocks: true,
    clearMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
