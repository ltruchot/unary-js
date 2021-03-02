import { applyTo, compose2 } from './function';
import { ifElse } from './any';

import { dec, inc, roundFloat } from './number_misc';
import { lmap, rmap } from './pair';
import { strConcat } from './string';
import { padEnd, split } from './string_misc';
import { toString } from './type';
import { isUndefined } from './type_misc';
import {
  head, second, length, last,
} from './xs';
import { eqLastX, reduce, takeAndKeep } from './xs_misc';

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

export const splitAtChar = (c: string) => (s: string): string[] => reduce([])(
  (acc: string[]) => (cur) => {
    if (cur === c) {
      return [...acc, ''];
    }
    const str = last(acc);
    if (isUndefined(str)) {
      return [...acc, cur];
    }
    return [...dropLast(acc), str + cur];
  },
)(split(s));
console.log(splitAtChar('.')('12.34'));

const splitAtDot = splitAtChar('.');

export const toFixed = (precision: number) => (n: number): string => {
  const splitted = splitAtDot(toString(roundFloat(precision)(n)));
  const decimal = second(splitted);
  return strConcat(
    padEnd('0')(precision)(isUndefined(decimal) ? '' : decimal),
  )(
    strConcat('.')(head(splitted)),
  );
};
console.log(toFixed(1)(231.7888));
console.log(toFixed(2)(231.7888));
console.log(toFixed(3)(231.7888));
console.log(toFixed(5)(231.7888));
console.log(toFixed(10)(231.7888));
