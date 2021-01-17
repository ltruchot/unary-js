import {
  ifElse,
  unless,
} from './any';
import { or } from './boolean';
import { FnGeneric2, FnGeneric3 } from './generic';
import { gte, lt } from './number';
import { eq0, inc } from './number_misc';
import { tail, head, length } from './xs_misc';

type FnReduce = (acc: any) => (f: FnGeneric2<any>) => (xs: any[]) => any;
export const reduce: FnReduce = (acc) => (f) => (xs) => unless(
  () => eq0(length(xs)),
)(() => reduce(f(acc)(head(xs)))(f)(tail(xs)))(acc);

type FnReduceIndexed = (acc: any) => (f: FnGeneric3<any>) => (xs: any[]) => any;
type FnReduceIndexedAndKeep = (i: number) => FnReduceIndexed;
export const reduceIndexedAndKeep: FnReduceIndexedAndKeep = (i) => (acc) => (f) => (xs) => unless(
  () => eq0(length(xs)),
)(() => reduceIndexedAndKeep(inc(i))(f(acc)(head(xs))(i))(f)(tail(xs)))(acc);

export const reduceIndexed: FnReduceIndexed = reduceIndexedAndKeep(0);

type FnMap = (f: (x: any) => any) => (xs: any[]) => any[];
export const map: FnMap = (f) => (xs) => reduce([])((acc) => (cur) => [...acc, f(cur)])(xs);

type FnZip = (xs: any[]) => FnReduceIndexed;
export const zip: FnZip = (xs) => reduceIndexed([])(
  (acc) => (cur) => (i) => [...acc, [cur, xs[i]]],
);

export const slice = (i1: number) => (i2: number) => reduceIndexed([])(
  (acc) => (cur) => (i) => unless(
    () => or(lt(i1)(i))(gte(i2)(i)),
  )((xs: any[]) => [...xs, cur])(acc),
);

export const flatten = reduce([])((acc) => (cur) => ifElse(
  () => (cur instanceof Array),
)(() => [...acc, ...flatten(cur)])(() => [...acc, cur])(acc));
