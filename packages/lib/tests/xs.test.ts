import { expect, test } from "vite-plus/test";

import { inc } from "../src/number_misc.ts";
import { head, isNonEmpty, last, length, matchNested, second, tail, uncons } from "../src/xs.ts";

test("length", () => {
  expect(length([])).toBe(0);
  expect(length(["test"])).toBe(1);
  expect(length([...Array.from({ length: 1_000_000 }).keys()])).toBe(1_000_000);
  expect(length([1, 2, 3])).not.toBe(42);
});

test("head", () => {
  expect(head<string>([])).toBeUndefined();
  expect(head(["test"])).toBe("test");
  expect(head([...Array.from({ length: 1_000_000 }).keys()])).toBe(0);
  expect(head([1, 2, 3])).not.toBe(42);
});

test("second", () => {
  expect(second<string>([])).toBeUndefined();
  expect(second(["test"])).toBeUndefined();
  expect(second(["test", "fake"])).toBe("fake");
  expect(second([...Array.from({ length: 1_000_000 }).keys()])).toBe(1);
  expect(second([1, 2, 3])).not.toBe(42);
});

test("last", () => {
  expect(last<string>([])).toBeUndefined();
  expect(last(["test"])).toBe("test");
  expect(last(["test", "fake"])).toBe("fake");
  expect(last([...Array.from({ length: 1_000_000 }).keys()])).toBe(999_999);
  expect(last([1, 2, 3])).not.toBe(42);
});

test("tail", () => {
  expect(tail([])).toEqual([]);
  expect(tail(["test"])).toEqual([]);
  expect(tail(["test", "fake"])).toEqual(["fake"]);
  expect(tail([...Array.from({ length: 10 }).keys()])).toEqual(
    [...Array.from({ length: 9 }).keys()].map((n) => inc(n)),
  );
  expect(tail([1, 2, 3])).not.toEqual(42);
});

test("isNonEmpty", () => {
  expect(isNonEmpty([])).toBe(false);
  expect(isNonEmpty([undefined])).toBe(true);
});

test("uncons", () => {
  const describe = uncons(() => "empty")<number>((x) => (rest) => `${x} then ${rest.length}`);
  expect(describe([])).toBe("empty");
  expect(describe([1, 2, 3])).toBe("1 then 2");
});

test("matchNested", () => {
  const describe = matchNested<number, string>(() => "item")(() => "list");
  expect(describe(42)).toBe("item");
  expect(describe([42])).toBe("list");
});
