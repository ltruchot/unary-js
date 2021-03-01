import { ifElse } from './any';
import { compose2 } from './function';
import { dec, inc, roundFloat } from './number_misc';
import { lmap, rmap } from './pair';
import { strConcat } from './string';
import { padEnd } from './string_misc';
import { toString } from './type';
import { isUndefined } from './type_misc';
import { head, second, length } from './xs';
import { eqLastX, takeAndKeep } from './xs_misc';

export const applyTo = (a: any) => (f: Function) => f(a);
export const incHead = compose2(inc)(head);
export const incSecond = compose2(inc)(second);
export const lmapInc = lmap(inc);
export const rmapInc = rmap(inc);
export const lastIndex = compose2(dec)(length);

export const take = applyTo([])(takeAndKeep);

export const dropLast = (xs: any[]) => take(
  lastIndex(xs),
)(xs);

export const indexOf = (xs: any[]) => (el: any) => ifElse(
  eqLastX(xs)(el),
)(() => length(xs) - 1)(compose2(indexOf)(dropLast)(xs))(el);

export const toFixed = (precision: number) => (n: number): string => {
  const splitted = toString(roundFloat(n)(precision)).split('.');
  const decimal = second(splitted);
  return strConcat(
    isUndefined(decimal) ? '0' : padEnd(decimal)(precision)(''),
  )(
    strConcat('.')(head(splitted)),
  );
};
console.log(toFixed(2)(231.7888));
