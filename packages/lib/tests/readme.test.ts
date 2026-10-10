import { expect, test } from "vite-plus/test";

import {
  add,
  compose3,
  filter,
  gt,
  gt0,
  ifElse,
  join,
  map,
  mul,
  reduce,
  safeY2,
  sub,
  sum,
  toFixed,
  toString,
  zip,
} from "../src/index.ts";

// Every example of README.md and of ../../README.md, as it is written there.

const sumOfDoubledPositives = compose3(sum)(map(mul(2)))(filter(gt0));

const factorial = safeY2<number, number, number>(
  (self) => (n) => (acc) => (n === 0 ? acc : self(n - 1)(n * acc)),
);

const describeSign = ifElse(gt(0))(() => "positive")(() => "not positive");

test("the first example", () => {
  expect(sumOfDoubledPositives([-1, 2, 3])).toBe(10);
});

test("one argument at a time, the data last", () => {
  expect(add(1)(2)).toBe(3);
  expect(sub(2)(44)).toBe(42);
  expect(gt(0)(5)).toBe(true);
  expect(describeSign(5)).toBe("positive");
  expect(describeSign(-5)).toBe("not positive");
});

test("lists and strings", () => {
  expect(reduce(0)(add)([1, 2, 3])).toBe(6);
  expect(zip(["a", "b"])([1, 2])).toEqual([
    [1, "a"],
    [2, "b"],
  ]);
  expect(join("-")(map(toString)([1, 2, 3]))).toBe("1-2-3");
  expect(toFixed(2)(231.7888)).toBe("231.79");
});

test("stack-safe recursion", () => {
  expect(factorial(5)(1)).toBe(120);
  expect(factorial(100_000)(1)).toBe(Infinity);
});
