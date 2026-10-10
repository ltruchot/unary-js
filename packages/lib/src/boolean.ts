import { identity, ifElse } from "./any.ts";
import type { FnAppend1, FnAppend2 } from "./generic.ts";

type FnBool1 = FnAppend1<boolean>;
/** Always `true`. */
export const t: FnBool1 = () => true;
/** Always `false`. */
export const f: FnBool1 = () => false;

export const not: FnBool1 = (b) => !b;

type FnBool2 = FnAppend2<boolean>;
export const and: FnBool2 = (b1) => (b2) => b2 && b1;
export const nand: FnBool2 = (b1) => (b2) => not(and(b1)(b2));
export const or: FnBool2 = (b1) => (b2) => b2 || b1;
export const nor: FnBool2 = (b1) => (b2) => not(or(b1)(b2));

/**
 * Material nonimplication: `without(b1)(b2)` is `b1 && !b2`.
 * @see https://en.wikipedia.org/wiki/Material_nonimplication
 */
export const without: FnBool2 = (b1) => (b2) => and(b1)(not(b2));

/** Exclusive or, from `or` and `without`. */
export const xor: FnBool2 = (b1) => (b2) => or(without(b1)(b2))(without(b2)(b1));
/** Exclusive or, from `and`, `or` and `nand`. */
export const xor2: FnBool2 = (b1) => (b2) => and(or(b1)(b2))(nand(b1)(b2));
/** Exclusive or, from `ifElse`. */
export const xor3: FnBool2 = (b1) => (b2) => ifElse<boolean>(() => b1)(not)(identity)(b2);
