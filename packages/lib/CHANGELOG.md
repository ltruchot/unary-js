# Changelog

All notable changes to the `unary-js` package.

## 0.1.0 (unreleased)

### Breaking changes

- The package is ESM only: `import` it, `require` no longer works. It needs Node.js 22.18 or later.
- The functions are typed with generics instead of `any`. Code that relied on `any` may need a
  type argument, for example `unless<number>(...)`.
- `safeY2`, `safeY3`, and `safeY4` are typed: `safeY2<A, B, R>(...)`. A recursive call returns a
  `Step<R>`, the result or a `Bounce`.
- `zip` stops at the end of the shorter list instead of padding with `undefined`.
- `take` returns at most the items there are, and nothing for a negative count, instead of
  padding with `undefined` or never returning.
- `dropDecimal` and `round` no longer go through `parseInt`: they are right for numbers written
  in exponent notation (`1e21`, `1e-7`).
- `isArray` is `Array.isArray`.

### Features

- The list and string functions (`reduce`, `map`, `filter`, `zip`, `slice`, `take`, `forEach`,
  `split`, `strLength`, `padEnd`, and what is built on them) run on the stack-safe combinators:
  no stack overflow on a long list.
- Numbers: `div`, `pow`, `isFinite`, `parseIntWithRadix`, `gt0`, `dropDecimal`, `round`,
  `roundFloat`, `toFixed`.
- Strings: `strConcat`, `charAt`, `strLength`, `split`, `splitAtChar`, `join`, `padEnd`, `padStart`.
- Lists: `filter`, `forEach`, `logEach`, `isEmpty`, `isNonEmpty`, `uncons`, `matchNested`,
  `lastIndex`.
- Types: `toString`, `toBoolean`, `isArray`, `isUndefined`.
- Recursion: `safeY1`, and the `Bounce` class behind the combinators.
- Every function has a test.

### Bug fixes

- `indexOf` returns the index of the first match, and `-1` when there is none.

## 0.0.7 (2021-02-16)

- Documentation.

## 0.0.6 (2021-02-16)

- Stack-safe recursion: `safeY2`, `safeY3`, and `safeY4`.

## 0.0.5 (2021-01-21)

- Version bump only.

## [0.0.4](https://github.com/ltruchot/unary-js/compare/v0.0.3...v0.0.4) (2021-01-20)

- Version bump only.

## 0.0.3 (2021-01-19)

- Bifunctors (`bmap`, `lmap`, `rmap`), `reduce`, `reduceIndexed`, and the functions of the first
  HackerRank example.
