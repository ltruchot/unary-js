import { equals } from './any';

type FnNumber1 = (b: number) => number;
type FnNumber2 = (b: number) => FnNumber1;
export const add: FnNumber2 = (n1) => (n2) => n2 + n1;
export const sub: FnNumber2 = (n1) => (n2) => n2 - n1;
export const mul: FnNumber2 = (n1) => (n2) => n2 * n1;
export const inc: FnNumber1 = add(1);
export const dec: FnNumber1 = sub(1);

export const eq0: FnNumber2 = equals(0);
