import { compose } from './function';
import { inc } from './number_misc';
import { lmap, rmap } from './pair';
import { head, second } from './xs_misc';

export const applyTo = (a: any) => (f: Function) => f(a);
export const incHead = compose(inc)(head);
export const incSecond = compose(inc)(second);
export const lmapInc = lmap(inc);
export const rmapInc = rmap(inc);
