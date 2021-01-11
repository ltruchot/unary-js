import { identity, ifElse, unless } from './any';
import { FnGeneric2, FnGeneric3 } from './generic';
import { eq0, inc } from './number';
import { tail, head, length } from './xs_misc';

type FnReduce = (acc: any) => (f: FnGeneric2<any>) => (xs: any[]) => any;
export const reduce: FnReduce = (acc) => (f) => (xs) => unless(
  eq0(length(xs)),
)(() => reduce(f(acc)(head(xs)))(f)(tail(xs)))(acc);

type FnReduceIndexed = (acc: any) => (f: FnGeneric3<any>) => (xs: any[]) => any;
type FnReduceIndexedAndKeep = (i: number) => FnReduceIndexed;
export const reduceIndexedAndKeep: FnReduceIndexedAndKeep = (i) => (acc) => (f) => (xs) => unless(
  eq0(length(xs)),
)(() => reduceIndexedAndKeep(inc(i))(f(acc)(head(xs))(i))(f)(tail(xs)))(acc);

export const reduceIndexed: FnReduceIndexed = reduceIndexedAndKeep(0);

type FnMap = (f: (x: any) => any) => (xs: any[]) => any[];
export const map: FnMap = (f) => (xs) => reduce([])((acc) => (cur) => [...acc, f(cur)])(xs);
