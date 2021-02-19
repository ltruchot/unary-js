type FnXsToNumber1 = (xs: readonly any[]) => number;
type FnXsToX = <T>(list: readonly T[]) => T
type FnXs1 = <T>(list: readonly T[]) => T[]

export const length: FnXsToNumber1 = (xs) => xs.length;

export const head: FnXsToX = (xs) => xs[0];
export const second: FnXsToX = (xs) => xs[1];
export const last: FnXsToX = (xs) => xs[length(xs) - 1];

export const tail: FnXs1 = (xs) => {
  const [, ...xsTail] = xs;
  return xsTail;
};
