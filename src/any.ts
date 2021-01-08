import { FnGeneric1, FnGeneric2, FnGeneric4 } from './generic';

export const identity: FnGeneric1<any> = (a) => a;
export const equals: FnGeneric2<any> = (a) => (b) => b === a;
export const ifElse: FnGeneric4<any> = (
  cond: boolean,
) => (f: any) => (g: any) => (a: any) => (cond ? f(a) : g(a));

// helpers
export const log: FnGeneric1<any> = (a) => {
  console.log(a);
  return a;
};
