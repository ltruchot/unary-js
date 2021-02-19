import { FnUnary, unless } from './any';
import { compose2 } from './function';
import { head, tail } from './xs';
import { isEmpty } from './xs_misc';

export type FnVoid = (a: any) => void;
export const log: FnVoid = (a) => {
  // eslint-disable-next-line no-console
  console.log(a);
};

export const tap = <T>(f: FnUnary) => (a: T): T => { f(a); return a; };

type FnForEach<T> = (f: FnVoid) => (xs: T[]) => any;
export const forEach: FnForEach<any> = (f) => (xs) => unless(
  () => isEmpty(xs),
)(() => forEach(f)(tail(tap<any[]>(compose2(f)(head))(xs))))(xs);

export const logEach = forEach(log);
