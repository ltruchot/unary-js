import { ifElse, where } from "./any.ts";
import { and } from "./boolean.ts";
import { compose2, compose3 } from "./function.ts";
import { isFinite, lt, mul, pow, sub } from "./number.ts";
import { abs, gt0, inc, lt0, round } from "./number_misc.ts";
import { strConcat } from "./string.ts";
import { join, padStart, split } from "./string_misc.ts";
import { toString } from "./type.ts";
import { length } from "./xs.ts";
import { slice } from "./xs_misc.ts";

const scale = (precision: number): ((n: number) => number) =>
  compose2(mul(pow(precision)(10)))(abs);

// The digits of `n` scaled to an integer, at least one of them before the fraction.
const scaledDigits = (precision: number): ((n: number) => string[]) =>
  compose3(split)(padStart("0")(inc(precision)))(compose3(toString)(round)(scale(precision)));

const cutIndex = (precision: number): ((digits: readonly string[]) => number) =>
  compose2(sub(precision))(length);

const integerPart =
  (precision: number) =>
  (digits: readonly string[]): string =>
    join("")(slice(0)(cutIndex(precision)(digits))(digits));

const fractionPart =
  (precision: number) =>
  (digits: readonly string[]): string =>
    join("")(slice(cutIndex(precision)(digits))(length(digits))(digits));

const withFraction =
  (precision: number) =>
  (digits: readonly string[]): string =>
    where<string>(() => gt0(precision))(
      compose2(strConcat(fractionPart(precision)(digits)))(strConcat(".")),
    )(integerPart(precision)(digits));

const sign = ifElse(lt0)(() => "-")(() => "");

const isFixable =
  (precision: number) =>
  (n: number): boolean =>
    and(isFinite(n))(lt(1e21)(scale(precision)(n)));

/**
 * `n` with `precision` decimals: `toFixed(2)(231.7888)` is `"231.79"`.
 * Halves round away from zero, on the scaled value: on a tie,
 * `Number.prototype.toFixed` may differ. A number that is not finite, or too
 * large to be scaled, is returned as `toString` writes it.
 */
export const toFixed =
  (precision: number) =>
  (n: number): string =>
    ifElse(isFixable(precision))((fixable: number) =>
      strConcat(withFraction(precision)(scaledDigits(precision)(fixable)))(sign(fixable)),
    )(toString)(n);
