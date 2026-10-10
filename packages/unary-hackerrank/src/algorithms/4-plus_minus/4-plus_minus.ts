import { div, eq0, filter, gt0, length, logEach, lt0, map, toFixed } from "unary-js";

// Complete the plusMinus function below.
export default function plusMinus(arr: readonly number[]): void {
  // the positive, the negative and the zero values
  const filtered = [filter(gt0)(arr), filter(lt0)(arr), filter(eq0)(arr)];
  const ratios = map((xs: readonly number[]) => div(length(arr))(length(xs)))(filtered);
  logEach(map(toFixed(6))(ratios));
}
