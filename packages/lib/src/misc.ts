import { ifElse } from './any';
import { compose2 } from './function';
import { dec, inc } from './number_misc';
import { lmap, rmap } from './pair';
import { head, second, length } from './xs';
import { eqLastX, takeAndKeep } from './xs_misc';

export const applyTo = (a: any) => (f: Function) => f(a);
export const incHead = compose2(inc)(head);
export const incSecond = compose2(inc)(second);
export const lmapInc = lmap(inc);
export const rmapInc = rmap(inc);

export const take = applyTo([])(takeAndKeep);

export const dropLast = (xs: any[]) => take(
  compose2(dec)(length)(xs),
)(xs);

export const indexOf = (xs: any[]) => (el: any) => ifElse(
  eqLastX(xs)(el),
)(() => length(xs) - 1)(compose2(indexOf)(dropLast)(xs))(el);
