import { defineConfig } from "vite-plus";

// The published package: `vp pack` writes dist/ (ESM and its declarations).
export default defineConfig({
  pack: { entry: ["src/index.ts"], format: ["esm"], dts: true },
  test: { include: ["tests/**/*.test.ts"] },
});
