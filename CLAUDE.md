> Session handoff: read `TODO.md` first — where the last session stopped, and what is left.
> Open a `todo/` file only for the item you work on. An item done → delete its line and its `todo/` file.

# unary-js

An educational library of curried **unary** functions in TypeScript, published to npm as
`unary-js` (`packages/lib`), and HackerRank problems solved with it
(`packages/unary-hackerrank`). One Vite+ workspace.

The constraint that outranks the rest: a function takes exactly one argument. The linter
enforces it (`max-params`, root `vite.config.ts`).

## Rules

- The developer speaks French: answer in French. Everything in the repo (code, comments, docs,
  commits) is US English.
- "Done" = `vp run ready` green. Never weaken a gate (lint rule, type option, test) to pass: fix
  the code. No `any`, no type assertion, no `oxlint-disable` in `packages/lib`. Never
  `git commit --no-verify`.
- The public API is the list of exports of `packages/lib/src/index.ts`. Renaming or removing an
  export, or changing an argument order, is a breaking change: ask first.
- Every export has a test, and every sentence of the READMEs is true of the code: the examples
  of the READMEs run in `packages/lib/tests/readme.test.ts`. A change of behavior is made in the
  code, the test, the README and `packages/lib/CHANGELOG.md` in the same turn.
- Commit only when asked, on a branch, never on `main` directly. Small conventional commits
  (`feat:`, `fix:`, `chore:`, `test:`, `docs:`).
- Never publish to npm unless asked: `vp pm publish` is the owner's call.
- After a push: `gh run watch <id> --exit-status`.
- Record a new fact or trap the same turn, in the file that owns it (table below): short bullets
  with the command, the error text and the fix.

## Where the detail lives

Load the skill before the work, and record what you learn in it.

| Work                                                             | Skill                     |
| ---------------------------------------------------------------- | ------------------------- |
| Writing, typing or testing a function of the library             | `unary-functions`         |
| Any `vp` command, `package.json`, `vite.config.ts`               | `vp`                      |
| The build of the package, its `exports`, a release, the lockfile | `vp-local`                |
| Reviewing a pull request                                         | `qa-pr`                   |
| Auditing or updating a dependency                                | `npm-vulnerability-check` |
| Open work, follow-ups                                            | `TODO.md`                 |

`vp`, `qa-pr` and `npm-vulnerability-check` are managed by qol-mini
(`.claude/qol-mini.lock.json`): never edit them here. Update them with
`vp dlx qol-mini@latest skills update .`, check them with `vp dlx qol-mini skills check .`.
What is specific to this repo goes in `vp-local`.

## Environment

- Node and pnpm are owned by Vite+: every command goes through `vp` (`vp install`, `vp check`,
  `vp test`, `vp run <task>`), never `pnpm`, `npm` or `npx` directly.
- npm packages must be 3 days old to be installed (`minimumReleaseAge` in `pnpm-workspace.yaml`).
- `pnpm-lock.yaml` is written by the pnpm of `devEngines`, not by the pnpm 10 this machine's
  `vp install` picks up → skill `vp-local`, "The lockfile".
- Local state (scratch, tarballs) goes in `.local/`, gitignored.

## Architecture

```
package.json, vite.config.ts   workspace root: `ready`, fmt/lint/staged for every package
pnpm-workspace.yaml            packages/*; `catalog:` = shared dependency versions
tsconfig.base.json             the strict compiler options every package extends
packages/lib/                  the npm package `unary-js`
  src/index.ts                 the public API: re-exports every module
  src/<type>.ts                primitives: each wraps one operator, property, method or conversion
  src/<type>_misc.ts           functions built from the other functions only
  src/safe.ts                  safeY1..4: stack-safe recursion (a trampoline, the only loop)
  src/xs.ts, xs_misc.ts        lists ("xs" = a list of x); the folds run on safe.ts
  src/effect_misc.ts           the impure corner: log, tap, forEach
  tests/<module>.test.ts       one test per export; readme.test.ts runs the README examples
  vite.config.ts               `pack` (ESM + declarations into dist/) and `test`
  CHANGELOG.md                 the only changelog
packages/unary-hackerrank/     private; imports the built `unary-js`, as a user would
  src/algorithms/<n>-<name>/   the solution, its tests, the link to the problem
.github/workflows/ci.yml       `vp run ready` on every push to main and pull request
```

## Commands

| Command                                | Does                                                       |
| -------------------------------------- | ---------------------------------------------------------- |
| `vp run ready`                         | The whole gate: `vp check`, then per package: build, tests |
| `vp check --fix`                       | Format, lint and type check (TS, JSON, YAML, Markdown)     |
| `vp -C packages/lib test`              | The library's tests, on its sources                        |
| `vp -C packages/lib test <filter>`     | The test files whose path matches                          |
| `vp -C packages/lib pack`              | Builds `packages/lib/dist`                                 |
| `vp -C packages/unary-hackerrank test` | The solutions, on `packages/lib/dist` as it was last built |

## Traps with no file trigger

- `packages/unary-hackerrank` imports `packages/lib/dist`: after a change in the library, its
  tests see the old code until `vp -C packages/lib pack` (or `vp run ready`) rebuilds it.
- zsh: an unquoted `--include=*` or `unary-js#ready` glob fails (`no matches found`); quote them.
  A word that starts with `=` (`echo ====`) fails with `not found`.
- The list functions copy the list at each step: a test on 100,000 items does not overflow the
  stack, it runs for minutes. `packages/lib/tests/safe.test.ts` stays at 10,000.
