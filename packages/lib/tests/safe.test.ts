import { expect, test } from "vite-plus/test";

import { identity } from "../src/any.ts";
import { forEach } from "../src/effect_misc.ts";
import { indexOf, take } from "../src/misc.ts";
import { gt0, inc } from "../src/number_misc.ts";
import { safeY1, safeY2, safeY3, safeY4 } from "../src/safe.ts";
import { padEnd, padStart, split, strLength } from "../src/string_misc.ts";
import { length } from "../src/xs.ts";
import { filter, map, sum, zip } from "../src/xs_misc.ts";

// Deep enough to overflow the stack of a plain recursion.
const DEEP = 1_000_000;
const SUM_TO_DEEP = 500_000_500_000;

const countDown = safeY1<number, string>((self) => (n) => (n === 0 ? "done" : self(n - 1)));

const factorial = safeY2<number, number, number>(
  (fact) => (n) => (acc) => (n === 0 ? acc : fact(n - 1)(n * acc)),
);

const sumTo = safeY2<number, number, number>(
  (self) => (n) => (acc) => (n === 0 ? acc : self(n - 1)(acc + n)),
);

const sumBy = safeY3<number, number, number, number>(
  (self) => (step) => (n) => (acc) => (n <= 0 ? acc : self(step)(n - step)(acc + n)),
);

const sumBetween = safeY4<number, number, number, number, number>(
  (self) => (step) => (min) => (n) => (acc) => (n < min ? acc : self(step)(min)(n - step)(acc + n)),
);

test("safeY1", () => {
  expect(countDown(DEEP)).toBe("done");
});

test("safeY2", () => {
  expect(factorial(100)(1)).toBe(9.332_621_544_394_418e157);
  expect(sumTo(DEEP)(0)).toBe(SUM_TO_DEEP);
});

test("safeY3", () => {
  expect(sumBy(1)(DEEP)(0)).toBe(SUM_TO_DEEP);
});

test("safeY4", () => {
  expect(sumBetween(1)(1)(DEEP)(0)).toBe(SUM_TO_DEEP);
});

// The list and string functions are built on the safe combinators. As plain
// recursions they took several stack frames per item: a list this long
// overflowed the stack. They copy the list at each step, hence no longer list.
const LONG = 10_000;
const longList = [...Array.from({ length: LONG }).keys()];
const longString = "a".repeat(LONG);

test("the list functions are stack-safe", () => {
  expect(sum(longList)).toBe((LONG * (LONG - 1)) / 2);
  expect(length(map(inc)(longList))).toBe(LONG);
  expect(length(filter(gt0)(longList))).toBe(LONG - 1);
  expect(length(zip(longList)(longList))).toBe(LONG);
  expect(length(take(LONG)(longList))).toBe(LONG);
  expect(indexOf(longList)(LONG - 1)).toBe(LONG - 1);
  expect(forEach(identity<number>)(longList)).toEqual([]);
});

test("the string functions are stack-safe", () => {
  expect(strLength(longString)).toBe(LONG);
  expect(length(split(longString))).toBe(LONG);
  expect(strLength(padEnd("b")(LONG + 1000)(longString))).toBe(LONG + 1000);
  expect(strLength(padStart("b")(LONG + 1000)(longString))).toBe(LONG + 1000);
});
