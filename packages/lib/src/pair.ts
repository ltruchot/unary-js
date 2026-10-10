export type Pair<T> = [T, T];

export const left = <T>([a]: Readonly<Pair<T>>): T => a;
export const right = <T>([, a]: Readonly<Pair<T>>): T => a;

/** Maps both sides: `bmap(f)(g)([a, b])` is `[f(a), g(b)]`. */
export const bmap =
  <A, B>(f: (a: A) => B) =>
  <C, D>(g: (c: C) => D) =>
  ([a, b]: readonly [A, C]): [B, D] => [f(a), g(b)];

/** Maps the left side. */
export const lmap =
  <A, B>(f: (a: A) => B) =>
  <C>([a, b]: readonly [A, C]): [B, C] => [f(a), b];

/** Maps the right side. */
export const rmap =
  <C, D>(g: (c: C) => D) =>
  <A>([a, b]: readonly [A, C]): [A, D] => [a, g(b)];
