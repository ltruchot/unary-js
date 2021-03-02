import {
  equals, unless, ifElse, where,
} from './any';
import { compose2 } from './function';
import { eq0, inc } from './number_misc';
import { or } from './boolean';
import { FnAppend2, FnAppend3 } from './generic';
import { add, gte, lt } from './number';

import {
  tail, head, length, last,
} from './xs';

type FnReduce = (acc: any) => (f: FnAppend2<any>) => (xs: any[]) => any;
type FnReduceIndexed = (acc: any) => (f: FnAppend3<any>) => (xs: any[]) => any;
type FnReduceIndexedAndKeep = (i: number) => FnReduceIndexed;
type FnMap = (f: (x: any) => any) => (xs: any[]) => any[];
type FnFilter = (f: (x: any) => boolean) => (xs: any[]) => any[];
type FnZip = (xs: any[]) => FnReduceIndexed;
type FnXsToBool<T> = (xs: T[]) => (a: T) => boolean;
type FnXsNToNumber = (xsN: number[]) => (a: number) => number;
type FnXsToNumber = (xs: any[]) => number;

export const isEmpty: FnXsToNumber = compose2(eq0)(length);

export const reduce: FnReduce = (acc) => (f) => (xs) => unless(
  () => isEmpty(xs),
)(() => reduce(f(acc)(head(xs)))(f)(tail(xs)))(acc);

export const reduceIndexedAndKeep: FnReduceIndexedAndKeep = (i) => (acc) => (f) => (xs) => unless(
  () => isEmpty(xs),
)(() => reduceIndexedAndKeep(inc(i))(f(acc)(head(xs))(i))(f)(tail(xs)))(acc);

export const reduceIndexed: FnReduceIndexed = reduceIndexedAndKeep(0);

export const map: FnMap = (f) => (xs) => reduce([])((acc) => (cur) => [...acc, f(cur)])(xs);

export const filter: FnFilter = (f) => (xs) => reduce([])(
  (acc) => (cur) => where(() => f(cur))(() => [...acc, cur])(acc),
)(xs);

export const zip: FnZip = (xs) => reduceIndexed([])(
  (acc) => (cur) => (i) => [...acc, [cur, xs[i]]],
);

export const slice = (i1: number) => (i2: number): any => reduceIndexed([])(
  (acc) => (cur) => (i) => unless(
    () => or(lt(i1)(i))(gte(i2)(i)),
  )((xs: any[]) => [...xs, cur])(acc),
);

export const flatten = reduce([])((acc) => (cur) => ifElse(
  () => (cur instanceof Array),
)(() => [...acc, ...flatten(cur)])(() => [...acc, cur])(acc));

export function takeAndKeep(
  newArr: any[],
) {
  return (n: number) => (xs: any[]): any[] => ifElse(
    () => equals(n)(length(newArr)),
  )(() => newArr)(takeAndKeep([...newArr, head(xs)])(n))(tail(xs));
}

export const eqLastX: FnXsToBool<any> = compose2(equals)(last);

/**
 * calculate the addition of all the member of an list of number
 * @param {Number[]} xs list of number
 * @return {Number}
 */
export const sum: FnXsNToNumber = reduce(0)(add);
