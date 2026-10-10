import { expect, test } from "vite-plus/test";

import { identity } from "../src/any.ts";
import { dec, inc } from "../src/number_misc.ts";
import { bmap, left, lmap, right, rmap } from "../src/pair.ts";
import { toString } from "../src/type.ts";

test("left", () => {
  expect(left([0, 0])).toBe(0);
  expect(left([1, 0])).toBe(1);
  expect(left(["test", "test"])).toBe("test");
  expect(left(["test", "fake"])).not.toBe("fake");
});

test("right", () => {
  expect(right([0, 0])).toBe(0);
  expect(right([0, 1])).toBe(1);
  expect(right(["test", "test"])).toBe("test");
  expect(right(["fake", "test"])).not.toBe("fake");
});

test("bmap", () => {
  expect(bmap(identity<number>)(identity<number>)([0, 0])).toEqual([0, 0]);
  expect(bmap(identity<number>)(identity<number>)([1, 0])).toEqual([1, 0]);
  expect(bmap(inc)(inc)([1, 0])).toEqual([2, 1]);
  expect(bmap(dec)(inc)([1, 0])).toEqual([0, 1]);
  expect(bmap(inc)(toString)([1, 0])).toEqual([2, "0"]);
});

test("lmap", () => {
  expect(lmap(identity<number>)([0, 0])).toEqual([0, 0]);
  expect(lmap(identity<number>)([1, 0])).toEqual([1, 0]);
  expect(lmap(inc)([1, 0])).toEqual([2, 0]);
  expect(lmap(dec)([1, 0])).toEqual([0, 0]);
});

test("rmap", () => {
  expect(rmap(identity<number>)([0, 0])).toEqual([0, 0]);
  expect(rmap(identity<number>)([1, 1])).toEqual([1, 1]);
  expect(rmap(inc)([1, 0])).toEqual([1, 1]);
  expect(rmap(dec)([1, 1])).toEqual([1, 0]);
});
