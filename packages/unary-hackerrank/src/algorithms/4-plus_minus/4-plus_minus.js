import { logEach, filter, lt0, eq0, gt0, map, length, div } from "unary-js";


// Complete the plusMinus function below.
export default function plusMinus(arr) {
  const filtered = [
    filter(gt0)(arr),
    filter(lt0)(arr), 
    filter(eq0)(arr),
  ];
  const triplet = map((xs) => div(length(arr))(length(xs)))(filtered);
  const fixedTriplet = map((n) => n.toFixed(6))(triplet);
  logEach(fixedTriplet);
}

