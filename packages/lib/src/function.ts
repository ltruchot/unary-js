/** `compose2(f)(g)(a)` is `f(g(a))`. */
export const compose2 =
  <B, C>(f: (b: B) => C) =>
  <A>(g: (a: A) => B) =>
  (a: A): C =>
    f(g(a));

/** `compose3(f)(g)(h)(a)` is `f(g(h(a)))`. */
export const compose3 =
  <C, D>(f: (c: C) => D) =>
  <B>(g: (b: B) => C) =>
  <A>(h: (a: A) => B) =>
  (a: A): D =>
    f(g(h(a)));

/** `applyTo(a)(f)` is `f(a)`. */
export const applyTo =
  <A>(a: A) =>
  <B>(f: (a: A) => B): B =>
    f(a);
