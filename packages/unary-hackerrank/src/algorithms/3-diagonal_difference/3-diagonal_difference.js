// inspired by unary-js

// tco
const trampoline = (bounce) => {
  let result = bounce;
  while (result && result.isBounce) {
    result = result.f();
  }
  return result;
};

const safeY3 = (rf) => {
  const bounce3 = (f) => (x) => (y) => (z) => ({
    isBounce: true,
    f: () => f(x)(y)(z),
  });
  const safeY = (f) => bounce3((x) => (y) => (z) => f(safeY(f))(x)(y)(z));
  return (x) => (y) => (z) => trampoline(safeY(rf)(x)(y)(z));
};

const safeY4 = (rf) => {
  const bounce3 = (f) => (a1) => (a2) => (a3) => (a4) => ({
    isBounce: true,
    f: () => f(a1)(a2)(a3)(a4),
  });
  const safeY = (f) => bounce3((a1) => (a2) => (a3) => (a4) => f(safeY(f))(a1)(a2)(a3)(a4));
  return (a1) => (a2) => (a3) => (a4) => trampoline(safeY(rf)(a1)(a2)(a3)(a4));
};

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
const dec = sub(1);
const lt0 = lt(0);

// types
const toNumber = (a) => Number(a);

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
const reduceIndexedAndKeep = safeY4(
  (rf) => (i) => (acc) => (f) => (xs) => unless(() => eq0(length(xs)))(
    () => rf(inc(i))(f(acc)(head(xs))(i))(f)(tail(xs)),
  )(acc),
);

const reduceIndexed = reduceIndexedAndKeep(0);
const slice = (i1) => (i2) => reduceIndexed([])(
  (acc) => (cur) => (i) => unless(() => or(lt(i1)(i))(gte(i2)(i)))((xs) => [...xs, cur])(acc),
);

const reduce = safeY3(
  (rf) => (acc) => (f) => (xs) => unless(() => eq0(
    length(xs),
  ))(() => rf(f(acc)(head(xs)))(f)(tail(xs)))(acc),
);

const flatten = reduce([])(
  (acc) => (cur) => ifElse(() => cur instanceof Array)(() => [...acc, ...flatten(cur)])(() => [
    ...acc,
    cur,
  ])(acc),
);

// misc
const keepMultipleOf = (skip) => reduceIndexed(0)(
  (acc) => (cur) => (i) => where(() => isMultipleOf(skip)(i))(add(cur))(acc),
);

const map = (f) => (xs) => reduce([])((acc) => (cur) => [...acc, f(cur)])(xs);
const mapToNumber = map(toNumber);

const compose3 = (f) => (g) => (h) => (a) => f(g(h(a)));

const diagDiff = (arr) => compose3((xs) => abs(
  sub(
    keepMultipleOf(dec(length(arr)))(
      slice(dec(length(arr)))(sub(dec(length(arr)))(length(xs)))(xs),
    ),
  )(keepMultipleOf(inc(length(arr)))(xs)),
))(mapToNumber)(flatten)(arr);

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
