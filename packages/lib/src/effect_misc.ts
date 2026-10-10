import { applyTo } from "./function.ts";
import { safeY1 } from "./safe.ts";
import type { Step } from "./safe.ts";
import { uncons } from "./xs.ts";

// The impure corner of the library: these functions are called for their effect.

export type FnVoid = (a: unknown) => void;
export const log: FnVoid = (a) => {
  console.log(a);
};

/** Runs `f(a)` for its effect and returns `a`. */
export const tap =
  <T>(f: (a: T) => unknown) =>
  (a: T): T => {
    f(a);
    return a;
  };

/** Runs `f` on each item, in order. Returns an empty list. */
export const forEach = <T>(f: (a: T) => unknown): ((xs: readonly T[]) => T[]) =>
  safeY1<readonly T[], T[]>((self) =>
    uncons<Step<T[]>>(() => [])<T>((x) => (rest) => applyTo(f(x))(() => self(rest))),
  );

export const logEach: (xs: readonly unknown[]) => unknown[] = forEach(log);
