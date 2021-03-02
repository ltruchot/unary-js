import {
  FnAppend1, FnTransform2, FnTransform4,
} from './generic';

export type FnUnary = FnAppend1<any>;

export const identity: FnUnary = (a) => a;

export const equals: FnTransform2<any, boolean> = (a) => (b) => b === a;

export const ifElse: FnTransform4<any, any> = (
  cond: FnUnary,
) => (f: FnUnary) => (g: FnUnary) => (a: any) => (cond(a) ? f(a) : g(a));

export const unless: FnTransform4<any, any> = (
  cond: FnUnary,
) => (f: FnUnary) => ifElse(cond)(identity)(f);

export const where: FnTransform4<any, any> = (
  cond: FnUnary,
) => (f: FnUnary) => ifElse(cond)(f)(identity);
