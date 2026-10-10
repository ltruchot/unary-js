/** A list nested to any depth. */
export type Nested<T> = readonly (T | Nested<T>)[];

export const length = (xs: readonly unknown[]): number => xs.length;

export const head = <T>(xs: readonly T[]): T | undefined => xs[0];
export const second = <T>(xs: readonly T[]): T | undefined => xs[1];
export const last = <T>(xs: readonly T[]): T | undefined => xs[length(xs) - 1];

export const tail = <T>(xs: readonly T[]): T[] => {
  const [, ...xsTail] = xs;
  return xsTail;
};

export const isNonEmpty = <T>(xs: readonly T[]): xs is readonly [T, ...T[]] => length(xs) > 0;

/** `uncons(empty)(f)(xs)` is `f(head)(tail)` for a non-empty list, `empty()` otherwise. */
export const uncons =
  <B>(empty: () => B) =>
  <T>(f: (x: T) => (rest: readonly T[]) => B) =>
  (xs: readonly T[]): B =>
    isNonEmpty(xs) ? f(xs[0])(tail(xs)) : empty();

const isNested = <T>(a: T | Nested<T>): a is Nested<T> => Array.isArray(a);

/** `matchNested(onItem)(onList)(a)` is `onList(a)` when `a` is a list, `onItem(a)` otherwise. */
export const matchNested =
  <T, B>(onItem: (a: T) => B) =>
  (onList: (xs: Nested<T>) => B) =>
  (a: T | Nested<T>): B =>
    isNested(a) ? onList(a) : onItem(a);
