import { identity, ifElse } from './any';
import { FnGeneric2, FnGeneric3 } from './generic';
import { eq0, inc } from './number';
import { tail, head, length } from './xs_misc';

type FnReduce = (acc: any) => (f: FnGeneric2<any>) => (xs: any[]) => any;
export const reduce: FnReduce = (acc) => (f) => (xs) => ifElse(
  eq0(length(xs)),
)(identity)(() => reduce(f(acc)(head(xs)))(f)(tail(xs)))(acc);

type FnReduceIndexed = (acc: any) => (f: FnGeneric3<any>) => (xs: any[]) => any;
type FnReduceIndexedAndKeep = (i: number) => FnReduceIndexed;
export const reduceIndexedAndKeep: FnReduceIndexedAndKeep = (i) => (acc) => (f) => (xs) => ifElse(
  eq0(length(xs)),
)(identity)(() => reduceIndexedAndKeep(inc(i))(f(acc)(head(xs))(i))(f)(tail(xs)))(acc);

export const reduceIndexed: FnReduceIndexed = reduceIndexedAndKeep(0);
