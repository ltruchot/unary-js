---
name: unary-functions
description: Writing, typing, fixing or testing a function of the unary-js library - the unary and data-last rules, primitives against `_misc` modules, generics without `any`, stack-safe recursion with safeY, one test per export. Load before touching any file under packages/lib/src or packages/lib/tests.
paths:
  - "packages/lib/src/**"
  - "packages/lib/tests/**"
---

# Writing a function of unary-js

Copy the shape of a neighbor in the same module before inventing one.

## The rules of the library

- **Unary.** One parameter per function, always: `(a) => (b) => ...`. A thunk `() => x` is
  fine. The linter rejects two parameters (`max-params`).
- **Data last.** The value being transformed is the last argument, so that a partial
  application reads as a transformation: `map(inc)`, `gt(0)`, `sub(1)`.
  For an operator, the first argument is therefore the right-hand operand:
  `sub(2)(44)` is `44 - 2`, `gt(0)(n)` is `n > 0`, `strConcat("b")("a")` is `"ab"`.
  Two exceptions, kept for compatibility: `indexOf(xs)(el)` and `eqLastX(xs)(a)` take the list
  first; `without(b1)(b2)` is `b1 && !b2`.
- **Primitives against `_misc`.** A module `<type>.ts` holds primitives: each one wraps exactly
  one operator, property, method or conversion of the language (`add`, `length`, `charAt`,
  `toNumber`). A module `<type>_misc.ts` is built from other functions of the library only: no
  operator, no statement, no method call, no `if`, no ternary. Array literals, spreads and
  destructured parameters are allowed.
- If a `_misc` function needs something the language does with an operator, add the primitive
  to the `<type>.ts` module first, with its test, then use it.
- **Branching is a function**: `ifElse(cond)(f)(g)(a)`, `unless(cond)(f)(a)`,
  `where(cond)(f)(a)`. Both branches are functions, so only one runs.
- **Effects** live in `effect_misc.ts` and nowhere else.
- **Names.** Short, in the vocabulary of the existing ones. `xs` is a list, `xsRest` its tail.
  `<name>AndKeep` is the worker that carries an accumulator (`reduceIndexedAndKeep`,
  `takeAndKeep`); the public function fixes its start value. A name can shadow a global
  (`toString`, `length`, `isFinite`): that is accepted.

## Types

- No `any`, no `Function`, no `as`, no non-null `!`. Use generics; `unknown` only for a value
  that is really anything (`toString`, `log`).
- Every export has an explicit type (the build needs it): either on the arrow function
  (parameters and return type) or on the constant, for a point-free definition:
  `export const sum: (xs: readonly number[]) => number = reduce(0)(add);`.
- Parameters are read-only: `readonly T[]`, `Readonly<Pair<T>>`, `readonly [A, C]`.
- One type parameter per curried step, declared where it is first known:
  `<A>(acc: A) => <T>(f: (acc: A) => (cur: T) => A) => (xs: readonly T[]): A`.
- When a predicate ignores its argument (`() => isEmpty(xs)`), TypeScript infers `unknown`:
  give the type argument, `unless<T[]>(...)`, `ifElse<string>(...)`.
- An item of a list is `T | undefined` (`noUncheckedIndexedAccess`), and `head` says so. To get
  a `T`, go through `uncons(empty)(f)`: `f` receives the head as a `T` and the tail.
- For a value that is an item or a nested list, `matchNested(onItem)(onList)`.

## Recursion

- JavaScript engines other than Safari's have no tail call optimization: a plain recursion
  over a list overflows the stack around 10,000 items.
- Recurse through `safeY1` .. `safeY4` (`safe.ts`), by the number of curried arguments that
  change from one call to the next. The function receives `self` and calls it instead of its
  own name; it returns `Step<R>`: the result, or what `self(...)` returns.

  ```ts
  export const reduce =
    <A>(acc: A) =>
    <T>(f: (acc: A) => (cur: T) => A): ((xs: readonly T[]) => A) =>
      safeY2<A, readonly T[], A>(
        (self) => (current) => uncons<Step<A>>(() => current)<T>((x) => self(f(current)(x))),
      )(acc);
  ```

- The call to `self` must be the last thing the function does (a tail call): carry the partial
  result in an accumulator argument instead of combining after the call.
- When a branch returns a plain value and the other one `self(...)`, type the plain one:
  `(): Step<number> => n`.
- Better still, build on `reduce` or `reduceIndexed` and write no recursion at all.

## Tests

- `packages/lib/tests/<module>.test.ts`, one `test("<export name>", ...)` per export, importing
  from `../src/<module>.ts` and from `vite-plus/test`.
- Cover the ordinary case, the empty input, and the limit that could loop or overflow (a
  negative count, a string already long enough, a list of 10,000 items in `safe.test.ts`).
- A new export also goes in the API table of `packages/lib/README.md` and in
  `packages/lib/CHANGELOG.md`. An example added to a README is added to `readme.test.ts`.
- Run `vp -C packages/lib test <module>`, then `vp run ready` before saying it is done.
