const left = (x) => ({
  __type: 'Left',
  map: () => left(x),
  chain: () => left(x),
  fold: (f, _) => f(x),
  isLeft: true,
  isRight: false,
});
const right = (x) => ({
  __type: 'Right',
  map: (f) => right(f(x)),
  chain: (f) => f(x),
  fold: (_, f) => f(x),
  isLeft: false,
  isRight: true,
});
const trampoline = (t) => {
  while (t.isRight) t = t.chain((f) => f());
  return t.fold((x) => x);
};
const Y2 = (f) => (x) => (y) => {
  const safeY = (g) => (a) => (b) => f(safeY(g))(a)(b);
  return trampoline(safeY(f)(x)(y));
};
const factorial = Y2(
  (fact) => (n) => (acc) => (n === 0 ? left(acc)
    : right(() => fact(n - 1)(n * acc))),
);

console.log(factorial(100)(1));
