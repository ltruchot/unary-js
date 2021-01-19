// inspired by unary-js

// operations
const negate = (n) => -n;
const equals = (n1) => (n2) => n1 === n2;
const add = (n1) => (n2) => n2 + n1;
const sub = (n1) => (n2) => n2 - n1;
const mod = (n1) => (n2) => n2 % n1;
const lt = (n1) => (n2) => n2 < n1;
const gte = (n1) => (n2) => n2 >= n1;
const or = (b1) => (b2) => b2 || b1;
const eq0 = equals(0);
const inc = add(1);
const lt0 = lt(0);

// functional
const identity = (any) => any;
const compose = (f) => (g) => (any) => f(g(any));

// conditionals
const ifElse = (cond) => (f) => (g) => (any) => (cond(any) ? f(any) : g(any));
const unless = (cond) => (f) => ifElse(cond)(identity)(f);
const where = (cond) => (f) => ifElse(cond)(f)(identity);

// compositions
const isMultipleOf = (n) => compose(eq0)(mod(n));
const abs = where(lt0)(negate);

// arrays
const head = (xs) => xs[0];
const tail = (xs) => {
  const [, ...xsTail] = xs;
  return xsTail;
};
const length = (xs) => xs.length;
const reduceIndexedAndKeep = (i) => (acc) => (f) => (xs) => unless(
  () => eq0(length(xs)),
)(() => reduceIndexedAndKeep(inc(i))(f(acc)(head(xs))(i))(f)(tail(xs)))(acc);

const reduceIndexed = reduceIndexedAndKeep(0);
const slice = (i1) => (i2) => reduceIndexed([])(
  (acc) => (cur) => (i) => unless(
    () => or(lt(i1)(i))(gte(i2)(i)),
  )((xs) => [...xs, cur])(acc),
);

const reduce = (acc) => (f) => (xs) => unless(
  () => eq0(length(xs)),
)(() => reduce(f(acc)(head(xs)))(f)(tail(xs)))(acc);

const flatten = reduce([])((acc) => (cur) => ifElse(
  () => (cur instanceof Array),
)(() => [...acc, ...flatten(cur)])(() => [...acc, cur])(acc));

// misc
const sumSkip = (skip) => reduceIndexed(0)((acc) => (cur) => (i) => where(
  () => isMultipleOf(inc(skip))(i),
)(add(cur))(acc));
const sumSkip3 = sumSkip(3);
const sumSkip1 = sumSkip(1);

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

export default function diagonalDifference(arr) {
  // return answer is right, but hacker-rank array is sometimes an array of string, so....
  return compose((xs) => abs(
    sub(sumSkip1(slice(2)(sub(2)(length(xs)))(xs)))(sumSkip3(xs)),
  ))(flatten)(arr);
}
