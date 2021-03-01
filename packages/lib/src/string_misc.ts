import {
  equals, ifElse, unless,
} from './any';
import { compose2 } from './function';
import { inc } from './number_misc';
import { strConcat } from './string';
import { isUndefined } from './type_misc';

const strLengthAndKeep = (n: number) => (s: string): any => ifElse(
  () => isUndefined(s[n]),
)(() => n)(strLengthAndKeep(inc(n)))(s);

export const strLength = strLengthAndKeep(0);

const splitAndKeep = (xs: string[]) => (n: number) => (s: string): any => ifElse(
  () => equals(strLength(s))(n),
)(() => xs)(() => splitAndKeep([...xs, s[n]])(inc(n))(s))(xs);

export const split = splitAndKeep([])(0);

export const padEnd = (c: string) => (n: number): any => unless(
  (s: string) => compose2(equals(n))(strLength)(s),
)(
  (s: string) => compose2(padEnd(c)(n))(strConcat(c))(s),
);
