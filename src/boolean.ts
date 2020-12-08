type FnBool1 = (b: boolean) => boolean;
export const t: FnBool1 = (_) => true;

export const f: FnBool1 = (_) => false;

export const not: FnBool1 = (b) => !b;

type FnBool2 = (b: boolean) => FnBool1;
export const and: FnBool2 = (b1) => (b2) => b1 && b2;

export const nand: FnBool2 = (b1) => (b2) => not(and(b1)(b2));

export const or: FnBool2 = (b1) => (b2) => b1 || b2;

export const nor: FnBool2 = (b1) => (b2) => not(or(b1)(b2));

/**
 *
 * @param b1
 * @see https://en.wikipedia.org/wiki/Material_nonimplication
 */
export const without: FnBool2 = (b1) => (b2) => and(b1)(not(b2));

export const xor: FnBool2 = (b1) => (b2) => or(without(b1)(b2))(without(b2)(b1));

export const xor2: FnBool2 = (b1) => (b2) => and(or(b1)(b2))(nand(b1)(b2));
