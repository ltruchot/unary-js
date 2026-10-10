import { expect, test } from "vite-plus/test";

import compareTriplets from "./1-compare_the_triplets.ts";

test("Algorithms / 1 - Compare the Triplets", () => {
  expect(compareTriplets([5, 6, 7], [3, 6, 10])).toEqual([1, 1]);
  expect(compareTriplets([17, 28, 30], [99, 16, 8])).toEqual([2, 1]);
});
