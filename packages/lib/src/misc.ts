import { equals, ifElse, where } from "./any.ts";
import { and } from "./boolean.ts";
import { compose2, compose3 } from "./function.ts";
import { dec, inc } from "./number_misc.ts";
import { lmap, rmap } from "./pair.ts";
import { strConcat } from "./string.ts";
import { split } from "./string_misc.ts";
import { toNumber } from "./type.ts";
import { head, length, second } from "./xs.ts";
import { reduce, reduceIndexed, takeAndKeep } from "./xs_misc.ts";

/** The first item plus one (`NaN` for an empty list). */
export const incHead: (xs: readonly number[]) => number = compose3(inc)(toNumber)(head);
/** The second item plus one (`NaN` for a list shorter than two). */
export const incSecond: (xs: readonly number[]) => number = compose3(inc)(toNumber)(second);
export const lmapInc: <C>(pair: readonly [number, C]) => [number, C] = lmap(inc);
export const rmapInc: <A>(pair: readonly [A, number]) => [A, number] = rmap(inc);
export const lastIndex: (xs: readonly unknown[]) => number = compose2(dec)(length);

/** The first `n` items. */
export const take =
  (n: number) =>
  <T>(xs: readonly T[]): T[] =>
    takeAndKeep<T>([])(n)(xs);

export const dropLast = <T>(xs: readonly T[]): T[] => take(lastIndex(xs))(xs);

/** List first: the index of the first item strictly equal to `el`, `-1` if there is none. */
export const indexOf =
  (xs: readonly unknown[]) =>
  (el: unknown): number =>
    reduceIndexed(-1)<unknown>(
      (found) => (cur) => (i) =>
        where<number>(() => and(equals(-1)(found))(equals(el)(cur)))(() => i)(found),
    )(xs);

type Parts = readonly [done: readonly string[], current: string];

const closeParts = ([done, current]: Parts): string[] => [...done, current];

/** `splitAtChar(".")("12.34")` is `["12", "34"]`. */
export const splitAtChar = (c: string): ((s: string) => string[]) =>
  compose3(closeParts)(
    reduce<Parts>([[], ""])<string>(([done, current]) =>
      ifElse<string>(equals(c))((): Parts => [[...done, current], ""])((char): Parts => [
        done,
        strConcat(char)(current),
      ]),
    ),
  )(split);
