import { ifElse, equals } from './any';
import { compose } from './function';
import { applyTo } from './misc';
import { dec } from './number_misc';

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

export function takeAndKeep(
  newArr: any[],
) {
  return (n: number) => (xs: any[]): any[] => ifElse(
    equals(n)(length(newArr)),
  )(() => newArr)(takeAndKeep([...newArr, head(xs)])(n))(tail(xs));
}

export const take = applyTo([])(takeAndKeep);

export const dropLast = (xs: any[]) => take(
  compose(dec)(length)(xs),
)(xs);

type FnXsToFn = (xs: any[]) => (a: any) => boolean;
export const eqLastX: FnXsToFn = compose(equals)(last);

export const indexOf = (xs: any[]) => (el: any) => ifElse(
  eqLastX(xs)(el),
)(() => length(xs) - 1)(compose(indexOf)(dropLast)(xs))(el);
