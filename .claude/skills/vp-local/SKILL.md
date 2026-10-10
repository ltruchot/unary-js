---
name: vp-local
description: This repo's Vite+ setup, on top of the shared `vp` skill - the library build (`vp pack`), the `exports` of the npm package, a release, the pnpm pinned by mise and the lockfile. Use before touching packages/lib/package.json, a vite.config.ts, pnpm-workspace.yaml, pnpm-lock.yaml or mise.toml, and before a release.
paths:
  - "**/package.json"
  - "**/vite.config.ts"
  - "pnpm-workspace.yaml"
  - "pnpm-lock.yaml"
  - "mise.toml"
---

# Vite+ in unary-js

The shared `vp` skill is written for an app (`dev`, `build`, `preview`, a port). This repo has
no app: `packages/lib` is a library. Ignore those rows; what replaces them is here.

## The workspace

| Package                     | `ready`                                                                                    | Notes                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| root                        | `bash scripts/check-versions.sh && vp -C packages/lib pack && vp check && vp run -r ready` | versions, the library build, format, lint, types, then each package  |
| `packages/lib`              | `vp pack && vp test`                                                                       | builds `dist/`, tests the sources                                    |
| `packages/unary-hackerrank` | `vp test`                                                                                  | depends on `unary-js` (`workspace:*`): runs after it, on its `dist/` |

## The library build

- The root `ready` builds the library **before** `vp check`: `packages/unary-hackerrank` imports
  `unary-js` through its `exports`, that is `packages/lib/dist`. Without `dist/` (a clean clone,
  CI), the type check cannot resolve the import and every use of it fails with
  `typescript(no-unsafe-call): Unsafe call of a(n) error type typed value` (135 errors on the
  first CI run, 2026-10-10, while the gate was green on a machine that had a `dist/`).
- So a green gate is only proven from a clean tree: `rm -r packages/lib/dist` first when the
  gate or a package's `exports` changed.

- `vp -C packages/lib pack` reads the `pack` block of `packages/lib/vite.config.ts`: one entry
  (`src/index.ts`), ESM only, declarations. Output: `dist/index.mjs`, `dist/index.d.mts`.
- Declarations are written by Oxc, which needs `isolatedDeclarations` (on in
  `packages/lib/tsconfig.json`): every export carries an explicit type. Without it:
  `error: TypeScript is not installed. Please install the typescript package ... or enable
  isolatedDeclarations`. The fix is never to install `typescript`.
- An export without a type fails the build, not `vp check`:
  `TS9010: Variable must have an explicit type annotation with --isolatedDeclarations`.
  Write the signature on the `export const`.
- `package.json` `exports` points to those two files; `files` is `["dist"]`; `sideEffects` is
  `false`. A new entry point is a new `exports` key and a new `pack.entry`.

## A release

Only when the owner asks. Nothing here publishes on its own.

1. `vp run ready` green, on a clean tree.
2. Version in `packages/lib/package.json`, its section in `packages/lib/CHANGELOG.md` dated.
3. `vp -C packages/lib pm pack`: the tarball holds `dist/`, `README.md`, `LICENSE`,
   `package.json`, and no `catalog:` is left in its `package.json` (pnpm resolves them when
   packing; `npm publish` from the folder would not).
4. Try the tarball in an empty folder outside the repo: extract it into
   `node_modules/unary-js`, `import` it from a `.mjs` file, check that nothing is logged.
5. `vp -C packages/lib pm publish`, then the tag `v<version>` and the push.

## pnpm and the lockfile

- The pnpm version is written twice and must be the same twice: `devEngines.packageManager` in
  the root `package.json` (what CI's `setup-vp` installs) and `pnpm` in `mise.toml` (what this
  machine runs). `bash scripts/check-versions.sh`, first step of `vp run ready`, compares them.
- Why mise: on this machine `vp` takes the package manager from the `PATH` (`vp env current`
  says `Source: system PATH`), and the global mise config puts pnpm 10 there. Without the pin,
  `vp install` writes a pnpm 10 lockfile that CI refuses, and cannot read the pinned one:
  `ERR_PNPM_BROKEN_LOCKFILE ... expected a single document in the stream, but found more`.
- In a terminal with `mise activate`, entering the repo is enough: `pnpm --version` prints the
  pin and `vp install` says `using pnpm v12`.
- An agent shell does not run `mise activate`: its `PATH` is the one of the session start.
  If `pnpm --version` there is not the pin, run the install through mise:
  `mise exec -- vp install` (`--frozen-lockfile` to change nothing). Building, testing and
  `vp run ready` do not call pnpm and work either way.
- A clean clone: `mise trust && mise install`, then `vp install`.
- Bump pnpm: `mise ls-remote pnpm | tail`, take a version 3 days old, write it in `mise.toml`
  and in `devEngines`, `mise install` (it rewrites `mise.lock`), `mise exec -- vp install`,
  and commit `mise.toml`, `mise.lock`, `package.json` and `pnpm-lock.yaml` together.
- Node is not in `mise.toml`: Vite+ downloads the one of `engines.node`.

## Dependencies

- The whole toolchain is three catalog entries in `pnpm-workspace.yaml`: `vite-plus`, `vite`
  (an alias of `@voidzero-dev/vite-plus-core`, same version) and `@types/node`. Vitest, Oxlint,
  Oxfmt and tsdown come with `vite-plus`. Bump `vite-plus` and `vite` together.
- Before a bump: `vp pm view <pkg> --json` and read `time`: the version must be 3 days old
  (`minimumReleaseAge`). `vp pm view <pkg> time.modified` is refused (`Unexpected argument`).
- The library has no runtime dependency. Keep it so.
- CI actions are pinned by commit SHA with the tag in a comment. For an annotated tag,
  `gh api repos/<owner>/<repo>/git/ref/tags/<tag>` gives the tag object, not the commit: follow
  it with `gh api repos/<owner>/<repo>/git/tags/<sha>`.

## Lint rules that shaped the code

- `max-params` is 1 everywhere, tests included: `test.each` rows are objects
  (`({ fn }) => ...`), and `Array.from({ length }, (_, i) => i)` is written
  `[...Array.from({ length }).keys()]`. The one disable is the entry point of
  `1-compare_the_triplets.ts`, whose two parameters are HackerRank's.
- `max-lines` (300) and `max-lines-per-function` (50): large test data lives in JSON files
  beside the test (`matrix-7.json`), imported `with { type: "json" }`.
- `import/max-dependencies` (10): the reason `toFixed` has its own module, `format_misc.ts`.
- `vitest/no-conditional-in-test`: a recursive function with a ternary is defined at module
  level, outside `test(...)`.
- `unicorn/no-useless-undefined` rejects a literal `undefined` argument: test `isUndefined`
  with `head<string>([])`.
- `typescript/no-confusing-void-expression` on `expect(head([]))`: an empty literal is
  `never[]`, so give the type, `head<string>([])`.
