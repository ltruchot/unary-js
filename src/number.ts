type FnNumber1 = (b: number) => number;
type FnNumber2 = (b: number) => FnNumber1;
export const add: FnNumber2 = (n1) => (n2) => n2 + n1;
export const sub: FnNumber2 = (n1) => (n2) => n2 - n1;
export const mul: FnNumber2 = (n1) => (n2) => n2 * n1;
