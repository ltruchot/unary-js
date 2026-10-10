/** Returns its argument. */
export const identity = <T>(a: T): T => a;

/** Strict equality (`===`), data last: `equals(a)(b)` is `b === a`. */
export const equals =
  <T>(a: T) =>
  (b: T): boolean =>
    b === a;

/** `ifElse(cond)(f)(g)(a)` is `f(a)` when `cond(a)` holds, `g(a)` otherwise. */
export const ifElse =
  <A>(cond: (a: A) => boolean) =>
  <B>(f: (a: A) => B) =>
  <C>(g: (a: A) => C) =>
  (a: A): B | C =>
    cond(a) ? f(a) : g(a);

/** `unless(cond)(f)(a)` is `a` when `cond(a)` holds, `f(a)` otherwise. */
export const unless =
  <A>(cond: (a: A) => boolean) =>
  <B>(f: (a: A) => B): ((a: A) => A | B) =>
    ifElse(cond)(identity<A>)(f);

/** `where(cond)(f)(a)` is `f(a)` when `cond(a)` holds, `a` otherwise (Ramda calls it `when`). */
export const where =
  <A>(cond: (a: A) => boolean) =>
  <B>(f: (a: A) => B): ((a: A) => A | B) =>
    ifElse(cond)(f)(identity<A>);
