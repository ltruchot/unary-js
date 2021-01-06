import { FnGeneric2 } from './generic';
import { tail } from './array';
import { head } from './array_to_item';

type FnReduce = (acc: any) => (f: FnGeneric2<any>) => (arr: any[]) => any;
export const reduce: FnReduce = (acc) => (f) => (arr) => (arr.length > 0
  ? reduce(f(acc)(head(arr)))(f)(tail(arr))
  : acc);
