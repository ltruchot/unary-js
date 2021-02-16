import {
  toNumber,
  add,
  dec,
  eq0, gte, ifElse, inc, lt, or, sub, unless, where, isMultipleOf, abs, length, head, tail,
  safeY3, safeY4, compose3,
} from 'unary-js';

const safeReduceIndexedAndKeep = safeY4(
  (reduceIndexedAndKeep) => (i) => (acc) => (f) => (xs) => unless(() => eq0(length(xs)))(
    () => reduceIndexedAndKeep(inc(i))(f(acc)(head(xs))(i))(f)(tail(xs)),
  )(acc),
);

const safeReduceIndexed = safeReduceIndexedAndKeep(0);

const safeSlice = (i1) => (i2) => safeReduceIndexed([])(
  (acc) => (cur) => (i) => unless(() => or(lt(i1)(i))(gte(i2)(i)))((xs) => [...xs, cur])(acc),
);

const safeReduce = safeY3(
  (reduce) => (acc) => (f) => (xs) => unless(() => eq0(
    length(xs),
  ))(() => reduce(f(acc)(head(xs)))(f)(tail(xs)))(acc),
);

const safeFlatten = safeReduce([])(
  (acc) => (cur) => ifElse(() => cur instanceof Array)(() => [...acc, ...safeFlatten(cur)])(() => [
    ...acc,
    cur,
  ])(acc),
);

// misc
const safeKeepMultipleOf = (skip) => safeReduceIndexed(0)(
  (acc) => (cur) => (i) => where(() => isMultipleOf(skip)(i))(add(cur))(acc),
);

const safeMap = (f) => (xs) => safeReduce([])((acc) => (cur) => [...acc, f(cur)])(xs);
const safeMapToNumber = safeMap(toNumber);

const diagDiff = (arr) => compose3((xs) => abs(
  sub(
    safeKeepMultipleOf(dec(length(arr)))(
      safeSlice(dec(length(arr)))(sub(dec(length(arr)))(length(xs)))(xs),
    ),
  )(safeKeepMultipleOf(inc(length(arr)))(xs)),
))(safeMapToNumber)(safeFlatten)(arr);

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

export default function diagonalDifference(arr) {
  // return answer is right, but hacker-rank array is sometimes an array of string, so....
  return diagDiff(arr);
}
