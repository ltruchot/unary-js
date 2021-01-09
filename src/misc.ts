import { compose } from './function';
import { inc } from './number';
import { head, second } from './xs_misc';

export const applyTo = (a: any) => (f: Function) => f(a);
export const incHead = compose(inc)(head);
export const incSecond = compose(inc)(second);
