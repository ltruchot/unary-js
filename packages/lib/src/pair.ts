import { FnUnary } from './any';

export type Pair<T> = [T, T];

export const left = <T>([a, _]: Pair<T>): T => a;
export const right = <T>([_, a]: Pair<T>): T => a;

export const bmap = (f: FnUnary) => (g: FnUnary) => ([a, b]: [any, any]) => [f(a), g(b)];
export const lmap = (f: FnUnary) => ([a, b]: [any, any]) => [f(a), b];
export const rmap = (f: FnUnary) => ([a, b]: [any, any]) => [a, f(b)];
