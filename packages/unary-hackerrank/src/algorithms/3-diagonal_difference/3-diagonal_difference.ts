import {
  abs,
  add,
  compose3,
  dec,
  gte,
  inc,
  isMultipleOf,
  length,
  lt,
  matchNested,
  or,
  safeY3,
  safeY4,
  sub,
  toNumber,
  uncons,
  unless,
  where,
} from "unary-js";
import type { Nested, Step } from "unary-js";

// HackerRank sometimes gives the numbers as strings.
type Cell = number | string;

// Written before the folds of unary-js were stack-safe: kept as an example of
// safeY3 and safeY4, on the largest matrices of the tests.
const safeReduceIndexed =
  <A>(acc: A) =>
  <T>(f: (acc: A) => (cur: T) => (i: number) => A): ((xs: readonly T[]) => A) =>
    safeY4<number, A, typeof f, readonly T[], A>(
      (self) => (i) => (current) => (g) =>
        uncons<Step<A>>(() => current)<T>((x) => self(inc(i))(g(current)(x)(i))(g)),
    )(0)(acc)(f);

const safeReduce =
  <A>(acc: A) =>
  <T>(f: (acc: A) => (cur: T) => A): ((xs: readonly T[]) => A) =>
    safeY3<A, typeof f, readonly T[], A>(
      (self) => (current) => (g) =>
        uncons<Step<A>>(() => current)<T>((x) => self(g(current)(x))(g)),
    )(acc)(f);

const safeSlice = (i1: number) => (i2: number) =>
  safeReduceIndexed<number[]>([])<number>(
    (acc) => (cur) => (i) =>
      unless<number[]>(() => or(lt(i1)(i))(gte(i2)(i)))((xs) => [...xs, cur])(acc),
  );

const safeFlatten = (xs: Nested<Cell>): Cell[] =>
  safeReduce<Cell[]>([])<Cell | Nested<Cell>>((acc) =>
    matchNested<Cell, Cell[]>((x) => [...acc, x])((ys) => [...acc, ...safeFlatten(ys)]),
  )(xs);

// The sum of one item out of `skip`, from the first one.
const safeKeepMultipleOf = (skip: number) =>
  safeReduceIndexed(0)<number>(
    (acc) => (cur) => (i) => where<number>(() => isMultipleOf(skip)(i))(add(cur))(acc),
  );

const safeMapToNumber = safeReduce<number[]>([])<Cell>((acc) => (cur) => [...acc, toNumber(cur)]);

// In the flat matrix of side n, the main diagonal is one item out of n + 1.
// The other one is one item out of n - 1, from the index n - 1 up to n² - n.
const diagDiff =
  (side: number) =>
  (xs: readonly number[]): number =>
    abs(
      sub(safeKeepMultipleOf(dec(side))(safeSlice(dec(side))(sub(dec(side))(length(xs)))(xs)))(
        safeKeepMultipleOf(inc(side))(xs),
      ),
    );

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

export default function diagonalDifference(arr: readonly (readonly Cell[])[]): number {
  return compose3(diagDiff(length(arr)))(safeMapToNumber)(safeFlatten)(arr);
}
