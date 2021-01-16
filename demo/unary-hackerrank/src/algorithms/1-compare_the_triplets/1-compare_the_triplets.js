import {
  equals, gt, ifElse, lmapInc, rmapInc, unless, reduceIndexed,
} from 'unary-js';

/**
 * Choose which part of a pair should change, considering who wins
 * @param {number[]} scores of Alice
 * @param {[number,number]} result pair representing the final scores  [Alice, Bob]
 * @param {number} current score of Bob in current iteration
 * @param {number} i index of the current iteration
 */
const dividePoints = (scores) => (result) => (current) => (i) => unless(
  () => equals(current)(scores[i]), // unless they have a different score, nothing change
)(
  ifElse(
    () => gt(scores[i])(current), // considering who wins, change the result
  )(lmapInc)(rmapInc), // lmapInc increments left in pair [Alice, Bob], rmapInc right
)(result);

// Complete the compareTriplets function below.
export default function compareTriplets(a, b) {
  // reduce the [0, 0] accumulator to [alice, bob] wins, return the final count
  return reduceIndexed([0, 0])(dividePoints(b))(a);
}
