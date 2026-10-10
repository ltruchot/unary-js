export type FnNumber1 = (b: number) => number;
export type FnNumber2 = (b: number) => FnNumber1;
export type FnNumber1ToBoolean = (n: number) => boolean;
export type FnNumber2ToBoolean = (n: number) => FnNumber1ToBoolean;

export const negate: FnNumber1 = (n) => -n;

// Data last: the first argument is the right-hand operand, `sub(2)(44)` is `44 - 2`.
export const add: FnNumber2 = (n1) => (n2) => n2 + n1;
export const sub: FnNumber2 = (n1) => (n2) => n2 - n1;
export const mul: FnNumber2 = (n1) => (n2) => n2 * n1;
export const div: FnNumber2 = (n1) => (n2) => n2 / n1;
export const pow: FnNumber2 = (exp) => (n) => n ** exp;
export const mod: FnNumber2 = (n1) => (n2) => n2 % n1;

// Data last too: `gt(0)(n)` is `n > 0`.
export const gt: FnNumber2ToBoolean = (n1) => (n2) => n2 > n1;
export const gte: FnNumber2ToBoolean = (n1) => (n2) => n2 >= n1;
export const lt: FnNumber2ToBoolean = (n1) => (n2) => n2 < n1;
export const lte: FnNumber2ToBoolean = (n1) => (n2) => n2 <= n1;

export const isFinite: FnNumber1ToBoolean = (n) => Number.isFinite(n);
/** `parseInt` of the number as `String` writes it, in the given radix. */
export const parseIntWithRadix: FnNumber2 = (radix) => (n) => Number.parseInt(String(n), radix);
