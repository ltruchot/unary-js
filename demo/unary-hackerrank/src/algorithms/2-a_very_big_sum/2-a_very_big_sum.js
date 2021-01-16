// Already 90% of the code reuse what was made in the previous challenge !!!

// operations
const equals = (n1) => (n2) => n1 === n2;
const eq0 = equals(0);
const add = (n1) => (n2) => n2 + n1;

// functional
const identity = (any) => any;

// conditionals
const ifElse = (cond) => (f) => (g) => (any) => (cond ? f(any) : g(any));
const unless = (cond) => (f) => ifElse(cond)(identity)(f);

// arrays
const head = (xs) => xs[0];
const tail = (xs) => {
  const [, ...xsTail] = xs;
  return xsTail;
};
const length = (xs) => xs.length;
const reduce = (acc) => (f) => (xs) => unless(
  eq0(length(xs)),
)(() => reduce(f(acc)(head(xs)))(f)(tail(xs)))(acc);
const xsSum = reduce(0)(add);

// Complete the aVeryBigSum function below.
export default function aVeryBigSum(ar) {
  return xsSum(ar);
}

console.log(aVeryBigSum([123, 456, 789]));
console.log(aVeryBigSum([0, 0, 0]));
console.log(aVeryBigSum([123000000000000, 4560000000000000, 7890000000000000]));
