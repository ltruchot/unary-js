import { defineConfig } from "vite-plus";

// The solutions import the built unary-js (packages/lib/dist), as a user would.
export default defineConfig({
  test: { include: ["src/**/*.test.ts"] },
});
