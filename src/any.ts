import { FnGeneric1, FnGeneric2, FnGeneric4 } from './generic';

export type FnUnary = FnGeneric1<any>;
export const identity: FnUnary = (a) => a;
export const equals: FnGeneric2<any> = (a) => (b) => b === a;
export const ifElse: FnGeneric4<any> = (
  cond: boolean,
) => (f: any) => (g: any) => (a: any) => (cond ? f(a) : g(a));

// helpers
export const log: FnUnary = (a) => {
  console.log(a);
  return a;
};
