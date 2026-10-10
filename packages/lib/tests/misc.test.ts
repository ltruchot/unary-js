import { expect, test } from "vite-plus/test";

import {
  dropLast,
  incHead,
  incSecond,
  indexOf,
  lastIndex,
  lmapInc,
  rmapInc,
  splitAtChar,
  take,
} from "../src/misc.ts";

test("incHead", () => {
  expect(incHead([1, 10])).toBe(2);
  expect(incHead([])).toBeNaN();
});

test("incSecond", () => {
  expect(incSecond([1, 10])).toBe(11);
  expect(incSecond([1])).toBeNaN();
});

test("lmapInc", () => {
  expect(lmapInc([0, 0])).toEqual([1, 0]);
});

test("rmapInc", () => {
  expect(rmapInc([0, 0])).toEqual([0, 1]);
});

test("lastIndex", () => {
  expect(lastIndex([1, 2, 3])).toBe(2);
  expect(lastIndex([])).toBe(-1);
});

test("take", () => {
  expect(take(2)([1, 2, 3])).toEqual([1, 2]);
  expect(take(0)([1, 2, 3])).toEqual([]);
  // More than there is, or less than nothing.
  expect(take(5)([1, 2])).toEqual([1, 2]);
  expect(take(-1)([1, 2])).toEqual([]);
});

test("dropLast", () => {
  expect(dropLast([1, 2, 3])).toEqual([1, 2]);
  expect(dropLast([1])).toEqual([]);
  expect(dropLast([])).toEqual([]);
});

test("indexOf", () => {
  expect(indexOf(["a", "b", "c"])("a")).toBe(0);
  expect(indexOf(["a", "b", "c"])("c")).toBe(2);
  // The first match.
  expect(indexOf(["a", "b", "a"])("a")).toBe(0);
  expect(indexOf(["a", "b", "c"])("z")).toBe(-1);
  expect(indexOf([])("a")).toBe(-1);
});

test("splitAtChar", () => {
  expect(splitAtChar(".")("12.34")).toEqual(["12", "34"]);
  expect(splitAtChar(".")("12")).toEqual(["12"]);
  // As String.prototype.split does.
  expect(splitAtChar(".")("")).toEqual([""]);
  expect(splitAtChar(".")(".5")).toEqual(["", "5"]);
  expect(splitAtChar(".")("1..2.")).toEqual(["1", "", "2", ""]);
});
