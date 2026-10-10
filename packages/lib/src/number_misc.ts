import { equals, ifElse, where } from "./any.ts";
import { compose2 } from "./function.ts";
import { add, div, gt, lt, mod, mul, negate, pow, sub } from "./number.ts";
import type { FnNumber1, FnNumber1ToBoolean, FnNumber2, FnNumber2ToBoolean } from "./number.ts";

export const inc: FnNumber1 = add(1);
export const dec: FnNumber1 = sub(1);

export const eq0: FnNumber1ToBoolean = equals(0);
export const lt0: FnNumber1ToBoolean = lt(0);
export const gt0: FnNumber1ToBoolean = gt(0);
/** `isMultipleOf(3)(9)` is `true`. */
export const isMultipleOf: FnNumber2ToBoolean = (n) => compose2(eq0)(mod(n));
export const abs: FnNumber1 = where(lt0)(negate);
/** Truncates toward zero. */
export const dropDecimal: FnNumber1 = (n) => sub(mod(1)(n))(n);
/** Rounds to the nearest integer, halves away from zero (`round(-0.5)` is `-1`). */
export const round: FnNumber1 = compose2(dropDecimal)(ifElse(lt0)(sub(0.5))(add(0.5)));
/** `roundFloat(2)(1.2345)` is `1.23`. */
export const roundFloat: FnNumber2 = (precision) => (n) =>
  div(pow(precision)(10))(round(mul(pow(precision)(10))(n)));
