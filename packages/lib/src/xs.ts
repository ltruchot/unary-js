type FnXsToNumber1 = (xs: readonly any[]) => number;
export const length: FnXsToNumber1 = (xs) => xs.length;

type FnXsToT1 = <T>(list: readonly T[]) => T
export const head: FnXsToT1 = (xs) => xs[0];
export const second: FnXsToT1 = (xs) => xs[1];
export const last: FnXsToT1 = (xs) => xs[length(xs) - 1];

type FnXs1 = <T>(list: readonly T[]) => T[]
export const tail: FnXs1 = (xs) => {
  const [, ...xsTail] = xs;
  return xsTail;
};
