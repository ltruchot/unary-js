import { expect, test } from "vite-plus/test";

import { equals, identity, ifElse, unless, where } from "../src/any.ts";
import { inc } from "../src/number_misc.ts";

test("identity", () => {
  expect(identity(false)).toBe(false);
  expect(identity("test")).toBe("test");
  expect(identity(42)).toBe(42);
  const arr = [1, 2, 3];
  expect(identity(arr)).toBe(arr);
  const o = { test: "test" };
  expect(identity(o)).toBe(o);
  expect(identity("test")).not.toBe("fake");
});

test("equals", () => {
  expect(equals(1)(1)).toBe(true);
  expect(equals<unknown>(1)("1")).toBe(false);
  // Strict equality, not a deep comparison.
  expect(equals<unknown>([1])([1])).toBe(false);
});

test("ifElse", () => {
  const sign = ifElse((n: number) => n < 0)(() => "negative")(() => "positive");
  expect(sign(-1)).toBe("negative");
  expect(sign(1)).toBe("positive");
});

test("unless", () => {
  const incUnlessZero = unless(equals(0))(inc);
  expect(incUnlessZero(0)).toBe(0);
  expect(incUnlessZero(41)).toBe(42);
});

test("where", () => {
  const incWhereZero = where(equals(0))(inc);
  expect(incWhereZero(0)).toBe(1);
  expect(incWhereZero(42)).toBe(42);
});
