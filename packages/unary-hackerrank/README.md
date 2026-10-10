# unary-hackerrank

[HackerRank](https://www.hackerrank.com) problems solved with [unary-js](../lib), each with the
test cases of the site.

| Problem                                                                                 | Solution                                                                                       |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Compare the Triplets](src/algorithms/1-compare_the_triplets/1-compare_the_triplets.md) | [`1-compare_the_triplets.ts`](src/algorithms/1-compare_the_triplets/1-compare_the_triplets.ts) |
| [A Very Big Sum](src/algorithms/2-a_very_big_sum/2-a_very_big_sum.md)                   | [`2-a_very_big_sum.ts`](src/algorithms/2-a_very_big_sum/2-a_very_big_sum.ts)                   |
| [Diagonal Difference](src/algorithms/3-diagonal_difference/3-diagonal_difference.md)    | [`3-diagonal_difference.ts`](src/algorithms/3-diagonal_difference/3-diagonal_difference.ts)    |
| [Plus Minus](src/algorithms/4-plus_minus/4-plus_minus.md)                               | [`4-plus_minus.ts`](src/algorithms/4-plus_minus/4-plus_minus.ts)                               |

The solutions import the built library, as a user of the npm package would: build it first.

```sh
vp -C packages/lib pack
vp -C packages/unary-hackerrank test
```

`vp run ready`, at the root of the repository, does both.

[`src/pocs/tco-js.md`](src/pocs/tco-js.md) lists the reading behind the stack-safe combinators.
