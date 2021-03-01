import { equals, ifElse, where } from './any';
import { compose2 } from './function';
import {
  add, lt,
  FnNumber1, FnNumber1ToBoolean, FnNumber2ToBoolean, mod, sub, negate, gt, pow, mul, div, FnNumber2,
} from './number';
import { toString } from './type';

export const inc: FnNumber1 = add(1);
export const dec: FnNumber1 = sub(1);

export const eq0: FnNumber1ToBoolean = equals(0);
export const lt0: FnNumber1ToBoolean = lt(0);
export const gt0: FnNumber1ToBoolean = gt(0);
export const isMultipleOf: FnNumber2ToBoolean = (n) => compose2(eq0)(mod(n));
export const abs = where(lt0)(negate);
export const parseIntWithRadix: FnNumber2 = (radix) => (n) => parseInt(
  toString(n), radix,
);
export const dropDecimal: FnNumber1 = parseIntWithRadix(10);
export const round: FnNumber1 = compose2(dropDecimal)(
  ifElse(lt0)(sub(0.5))(add(0.5)),
);
export const roundFloat: FnNumber2 = (num) => (precision) => {
  const power = pow(precision)(10);
  return div(power)(round(mul(num)(power)));
};
