export type FnNumber1 = (b: number) => number;
export type FnNumber2 = (b: number) => FnNumber1;
export type FnNumber1ToBoolean = (n: number) => boolean;
export type FnNumber2ToBoolean = (n: number) => FnNumber1ToBoolean;

export const negate: FnNumber1 = (n) => -n;

export const mod: FnNumber2 = (n1) => (n2) => n2 % n1;
export const add: FnNumber2 = (n1) => (n2) => n2 + n1;
export const sub: FnNumber2 = (n1) => (n2) => n2 - n1;
export const mul: FnNumber2 = (n1) => (n2) => n2 * n1;

export const gt: FnNumber2ToBoolean = (n1) => (n2) => n2 > n1;
export const gte: FnNumber2ToBoolean = (n1) => (n2) => n2 >= n1;
export const lt: FnNumber2ToBoolean = (n1) => (n2) => n2 < n1;
export const lte: FnNumber2ToBoolean = (n1) => (n2) => n2 <= n1;
