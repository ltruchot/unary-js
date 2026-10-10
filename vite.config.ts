import { defineConfig } from "vite-plus";

// Workspace root: format, lint and staged checks for every package (Vite+
// does not apply nested lint/fmt blocks). The library: packages/lib/vite.config.ts.
const FROZEN = [
  // Managed by qol-mini (.claude/qol-mini.lock.json): updated there, never rewritten here.
  ".claude/skills/vp/**",
  ".claude/skills/qa-pr/**",
  ".claude/skills/npm-vulnerability-check/**",
  // The legal text of the license, verbatim.
  "**/LICENSE",
];

export default defineConfig({
  staged: {
    "*.{ts,js,json,css,html,md,yaml}": "vp check --fix",
  },
  fmt: { ignorePatterns: FROZEN },
  lint: {
    ignorePatterns: FROZEN,
    plugins: ["eslint", "typescript", "unicorn", "oxc", "import", "promise", "node", "vitest"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    categories: {
      correctness: "error",
      suspicious: "error",
      pedantic: "error",
      perf: "error",
    },
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
      // The point of the library: a function takes one argument.
      "max-params": ["error", { max: 1 }],
      // Inferred callback parameters cannot be made deeply readonly; the rest must be.
      "typescript/prefer-readonly-parameter-types": ["error", { ignoreInferredTypes: true }],
    },
    options: {
      typeAware: true,
      typeCheck: true,
      denyWarnings: true,
      reportUnusedDisableDirectives: "error",
    },
  },
});
