import { FnGeneric2 } from './generic';
import { tail } from './array';
import { head } from './array_to_item';

type FnReduce = (acc: any) => (f: FnGeneric2<any>) => (arr: any[]) => any;
export const reduce: FnReduce = (acc) => (f) => (arr) => {
  if (arr.length > 0) {
    const first = head(arr);
    const rest = tail(arr);
    const newAcc = f(acc)(first);
    return reduce(newAcc)(f)(rest);
  }
  return acc;
};
