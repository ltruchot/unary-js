import { expect, test } from "vite-plus/test";

import { add } from "../src/number.ts";
import { eq0, gt0, inc } from "../src/number_misc.ts";
import { strConcat } from "../src/string.ts";
import {
  eqLastX,
  filter,
  flatten,
  isEmpty,
  map,
  reduce,
  reduceIndexed,
  reduceIndexedAndKeep,
  slice,
  sum,
  takeAndKeep,
  zip,
} from "../src/xs_misc.ts";

test("isEmpty", () => {
  expect(isEmpty([])).toBe(true);
  expect(isEmpty([0])).toBe(false);
});

test("reduce", () => {
  expect(reduce(0)(add)([1, 2, 3])).toBe(6);
  expect(reduce(0)(add)([])).toBe(0);
  // From the left.
  expect(reduce("")<string>((acc) => (cur) => strConcat(cur)(acc))(["a", "b", "c"])).toBe("abc");
});

test("reduceIndexed", () => {
  expect(reduceIndexed(0)<string>((acc) => () => (i) => acc + i)(["a", "b", "c"])).toBe(3);
});

test("reduceIndexedAndKeep", () => {
  expect(reduceIndexedAndKeep(10)(0)<string>((acc) => () => (i) => acc + i)(["a", "b"])).toBe(21);
});

test("map", () => {
  expect(map(inc)([1, 2, 3])).toEqual([2, 3, 4]);
  expect(map(inc)([])).toEqual([]);
});

test("filter", () => {
  expect(filter(eq0)([0, 1, 0, 0, 1])).toEqual([0, 0, 0]);
  expect(filter(gt0)([0, 1, 0, 0, 1])).toEqual([1, 1]);
});

test("slice", () => {
  expect(slice(1)(4)([0, 1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3]);
  expect(slice(0)(0)([0, 1])).toEqual([]);
  expect(slice(1)(10)([0, 1])).toEqual([1]);
});

test("zip", () => {
  expect(zip([5, 6, 7, 8])([1, 2, 3, 4])).toEqual([
    [1, 5],
    [2, 6],
    [3, 7],
    [4, 8],
  ]);
  // Up to the shorter list, whichever it is.
  expect(zip(["a"])([1, 2])).toEqual([[1, "a"]]);
  expect(zip(["a", "b"])([1])).toEqual([[1, "a"]]);
});

test("flatten", () => {
  expect(flatten<number>([1, [2, [3, [4]]], 5])).toEqual([1, 2, 3, 4, 5]);
  expect(flatten<number>([])).toEqual([]);
});

test("takeAndKeep", () => {
  expect(takeAndKeep([0])(3)([1, 2, 3])).toEqual([0, 1, 2]);
});

test("eqLastX", () => {
  expect(eqLastX([1, 2, 3])(3)).toBe(true);
  expect(eqLastX([1, 2, 3])(1)).toBe(false);
});

test("sum", () => {
  expect(sum([])).toBe(0);
  expect(sum([0])).toBe(0);
  expect(sum([1])).toBe(1);
  expect(sum([0, 1])).toBe(1);
  expect(sum([1, 2, 3, 4])).toBe(10);
});
