# TODO

## Where we stopped

- 2026-10-11, branch `chore/modernize`, committed and pushed: the move to a Vite+ workspace,
  the typed rewrite of the library (0.1.0), the docs and the Claude Code harness.
  `vp run ready` is green there.
- No pull request yet, so CI (`.github/workflows/ci.yml`) has never run: it runs on a pull
  request and on `main` only. Next: open the pull request and watch its first run.
- `unary-js@0.1.0` is **not published**; npm still serves 0.0.7 (CommonJS, 2021).

## Later

- Publish 0.1.0 → skill `vp-local`, "A release". Breaking changes: `packages/lib/CHANGELOG.md`.
- Owner: the license is CC BY-NC 4.0, which Creative Commons does not recommend for software.
  Keep it or pick a software license (MIT, ...).
- The folds are stack-safe but quadratic: `tail` and `[...acc, x]` copy the list at each step.
  A linear `reduce` needs an index-based primitive in `xs.ts`.
- `flatten` recurses on the stack once per nesting level (not per item).
- A search by signature (the README announces it as an idea): none yet.
- More examples: LeetCode, Project Euler, Advent of Code. None started.
- `toFixed` rounds on the scaled value: on a tie it can differ from `Number.prototype.toFixed`
  (`toFixed(1)(1.45)` is `"1.5"`, the native one gives `"1.4"`).
- `origin/develop` holds one commit that `main` lacks (`a496126`, `safeY1`): it is part of the
  rewrite. The branch can be deleted once this work is merged.
