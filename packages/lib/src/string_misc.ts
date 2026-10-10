import { equals, ifElse, unless } from "./any.ts";
import { or } from "./boolean.ts";
import { gte } from "./number.ts";
import { inc } from "./number_misc.ts";
import { safeY1, safeY2 } from "./safe.ts";
import type { Step } from "./safe.ts";
import { charAt, strConcat } from "./string.ts";
import { uncons } from "./xs.ts";
import { reduce } from "./xs_misc.ts";

const isEmptyStr = equals("");

export const strLength = (s: string): number =>
  safeY1<number, number>(
    (self) => (n) =>
      ifElse<string>(isEmptyStr)((): Step<number> => n)(() => self(inc(n)))(charAt(n)(s)),
  )(0);

/** A string as the list of its characters (UTF-16 code units). */
export const split = (s: string): string[] =>
  safeY2<readonly string[], number, string[]>(
    (self) => (chars) => (n) =>
      ifElse<string>(isEmptyStr)((): Step<string[]> => [...chars])((c) =>
        self([...chars, c])(inc(n)),
      )(charAt(n)(s)),
  )([])(0);

/** `join("-")(["a", "b"])` is `"a-b"`. */
export const join = (separator: string): ((xs: readonly string[]) => string) =>
  uncons(() => "")<string>((x) =>
    reduce(x)<string>((acc) => (cur) => strConcat(cur)(strConcat(separator)(acc))),
  );

const isPadded =
  (c: string) =>
  (n: number) =>
  (s: string): boolean =>
    or(isEmptyStr(c))(gte(n)(strLength(s)));

/** Appends `c` until the string is at least `n` long. */
export const padEnd =
  (c: string) =>
  (n: number): ((s: string) => string) =>
    safeY1<string, string>((self) => unless<string>(isPadded(c)(n))((s) => self(strConcat(c)(s))));

/** Prepends `c` until the string is at least `n` long. */
export const padStart =
  (c: string) =>
  (n: number): ((s: string) => string) =>
    safeY1<string, string>((self) => unless<string>(isPadded(c)(n))((s) => self(strConcat(s)(c))));
