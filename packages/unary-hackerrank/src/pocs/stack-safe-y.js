import {
  add,
  tail, head, unless, length, eq0,
} from 'unary-js';

const trampoline = (t) => {
  while (t && t.isBounce) t = t.f();
  return t;
};

const safeY2 = (rf) => {
  const bounce2 = (f) => (x) => (y) => ({ isBounce: true, f: () => f(x)(y) });
  const safeY = (f) => bounce2((x) => (y) => f(safeY(f))(x)(y));
  return (x) => (y) => trampoline(safeY(rf)(x)(y));
};
const safeY3 = (rf) => {
  const bounce3 = (f) => (x) => (y) => (z) => ({ isBounce: true, f: () => f(x)(y)(z) });
  const safeY = (f) => bounce3((x) => (y) => (z) => f(safeY(f))(x)(y)(z));
  return (x) => (y) => (z) => trampoline(safeY(rf)(x)(y)(z));
};

const factorial = safeY2(((r) => (n) => (acc) => (n === 0 ? acc : r(n - 1)(n * acc))));
console.log(factorial(100)(1)); // 9.332621544394418e+157

const reduce = safeY3((r) => (acc) => (f) => (xs) => unless(() => eq0(length(xs)))(
  () => r(f(acc)(head(xs)))(f)(tail(xs)),
)(
  acc,
));
console.log(reduce(0)(add)([1, 2, 3]));
