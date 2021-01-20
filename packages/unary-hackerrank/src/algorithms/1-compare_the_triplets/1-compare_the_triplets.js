import {
  ifElse, lmapInc, rmapInc, unless, reduce, zip, isBalancedPair, isLeftGreater,
} from 'unary-js';

/**
 * Choose which part of a pair should change, considering who wins
 * @param {[number,number]} acc pair representing the final scores  [Alice, Bob]
 * @param {number} cur score of Bob in cur iteration
 */
const splitPoints = (acc) => (cur) => unless(
  () => isBalancedPair(cur), // unless they have a different score, nothing change
)(
  ifElse(
    () => isLeftGreater(cur), // considering who wins, change the result
  )(lmapInc)(rmapInc), // lmapInc increments left in pair [Alice, Bob], rmapInc right
)(acc);

// Complete the compareTriplets function below.
export default function compareTriplets(a, b) {
  // reduce the [0, 0] accumulator to [alice, bob] wins, return the final count
  return reduce([0, 0])(splitPoints)(zip(b)(a));
}
