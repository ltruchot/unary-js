import {
  ifElse,
  isBalancedPair,
  isLeftGreater,
  lmapInc,
  reduce,
  rmapInc,
  unless,
  zip,
} from "unary-js";

// [Alice, Bob]
type Scores = readonly [number, number];

/**
 * Gives the point of one round to its winner.
 * @param acc the scores so far
 * @param cur the ratings of the round
 */
const splitPoints =
  (acc: Scores) =>
  (cur: Scores): Scores =>
    // on a tie, nothing changes
    unless<Scores>(() => isBalancedPair(cur))(
      // lmapInc gives the point to Alice, rmapInc to Bob
      ifElse<Scores>(() => isLeftGreater(cur))(lmapInc)(rmapInc),
    )(acc);

// Complete the compareTriplets function below.
// oxlint-disable-next-line max-params -- the signature HackerRank calls
export default function compareTriplets(a: readonly number[], b: readonly number[]): Scores {
  // one [Alice, Bob] pair of ratings per round, reduced to the two scores
  return reduce<Scores>([0, 0])(splitPoints)(zip(b)(a));
}
