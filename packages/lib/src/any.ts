import { FnGeneric1, FnGeneric2, FnGeneric4 } from './generic';

export type FnUnary = FnGeneric1<any>;

export const identity: FnUnary = (a) => a;

export const equals: FnGeneric2<any> = (a) => (b) => b === a;

export const ifElse: FnGeneric4<any> = (
  cond: FnUnary,
) => (f: FnUnary) => (g: FnUnary) => (a: any) => (cond(a) ? f(a) : g(a));

export const unless: FnGeneric4<any> = (
  cond: FnUnary,
) => (f: FnUnary) => ifElse(cond)(identity)(f);

export const where: FnGeneric4<any> = (
  cond: FnUnary,
) => (f: FnUnary) => ifElse(cond)(f)(identity);

export const tap = <T>(f: FnUnary) => (a: T): T => { f(a); return a; };
