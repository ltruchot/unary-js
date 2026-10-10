import { equals, ifElse, unless, where } from "./any.ts";
import { or } from "./boolean.ts";
import { compose2 } from "./function.ts";
import { add, gte, lt } from "./number.ts";
import { eq0, inc } from "./number_misc.ts";
import { safeY2, safeY3 } from "./safe.ts";
import type { Step } from "./safe.ts";
import { last, length, matchNested, uncons } from "./xs.ts";
import type { Nested } from "./xs.ts";

export const isEmpty: (xs: readonly unknown[]) => boolean = compose2(eq0)(length);

/** Left fold, accumulator first: `reduce(acc)(f)(xs)`, with `f(acc)(cur)`. */
export const reduce =
  <A>(acc: A) =>
  <T>(f: (acc: A) => (cur: T) => A): ((xs: readonly T[]) => A) =>
    safeY2<A, readonly T[], A>(
      (self) => (current) => uncons<Step<A>>(() => current)<T>((x) => self(f(current)(x))),
    )(acc);

/** `reduceIndexed`, counting from `i`. */
export const reduceIndexedAndKeep =
  (i: number) =>
  <A>(acc: A) =>
  <T>(f: (acc: A) => (cur: T) => (i: number) => A): ((xs: readonly T[]) => A) =>
    safeY3<number, A, readonly T[], A>(
      (self) => (index) => (current) =>
        uncons<Step<A>>(() => current)<T>((x) => self(inc(index))(f(current)(x)(index))),
    )(i)(acc);

/** Left fold with the index: `f(acc)(cur)(i)`. */
export const reduceIndexed: <A>(
  acc: A,
) => <T>(f: (acc: A) => (cur: T) => (i: number) => A) => (xs: readonly T[]) => A =
  reduceIndexedAndKeep(0);

export const map = <T, U>(f: (x: T) => U): ((xs: readonly T[]) => U[]) =>
  reduce<U[]>([])<T>((acc) => (cur) => [...acc, f(cur)]);

export const filter = <T>(f: (x: T) => boolean): ((xs: readonly T[]) => T[]) =>
  reduce<T[]>([])<T>((acc) => (cur) => where<T[]>(() => f(cur))((kept) => [...kept, cur])(acc));

/**
 * Pairs two lists up to the shorter one, data last: `zip(xs)(ys)` is
 * `[[ys[0], xs[0]], [ys[1], xs[1]], ...]`.
 */
export const zip =
  <T>(xs: readonly T[]) =>
  <U>(ys: readonly U[]): [U, T][] =>
    safeY3<[U, T][], readonly T[], readonly U[], [U, T][]>(
      (self) => (zipped) => (xsLeft) =>
        uncons<Step<[U, T][]>>(() => zipped)<U>(
          (y) => (ysRest) =>
            uncons<Step<[U, T][]>>(() => zipped)<T>(
              (x) => (xsRest) => self([...zipped, [y, x]])(xsRest)(ysRest),
            )(xsLeft),
        ),
    )([])(xs)(ys);

/** The items from index `i1` up to, but not including, index `i2`. */
export const slice =
  (i1: number) =>
  (i2: number) =>
  <T>(xs: readonly T[]): T[] =>
    reduceIndexed<T[]>([])<T>(
      (acc) => (cur) => (i) =>
        unless<T[]>(() => or(lt(i1)(i))(gte(i2)(i)))((kept) => [...kept, cur])(acc),
    )(xs);

/** Flattens a nested list, to any depth. */
export const flatten = <T>(xs: Nested<T>): T[] =>
  reduce<T[]>([])<T | Nested<T>>((acc) =>
    matchNested<T, T[]>((x) => [...acc, x])((ys) => [...acc, ...flatten(ys)]),
  )(xs);

/** `take`, starting from the items already taken. */
export const takeAndKeep =
  <T>(taken: readonly T[]) =>
  (n: number): ((xs: readonly T[]) => T[]) =>
    safeY2<readonly T[], readonly T[], T[]>(
      (self) => (kept) =>
        ifElse<readonly T[]>(() => gte(n)(length(kept)))((): Step<T[]> => [...kept])(
          uncons<Step<T[]>>(() => [...kept])<T>((x) => self([...kept, x])),
        ),
    )(taken);

/** `eqLastX(xs)(a)`: is `a` the last item of `xs`? */
export const eqLastX: (xs: readonly unknown[]) => (a: unknown) => boolean = compose2(equals)(last);

/** The sum of a list of numbers. */
export const sum: (xs: readonly number[]) => number = reduce(0)(add);
