import { expect, test } from "vite-plus/test";

import { head } from "../src/xs.ts";
import { isArray, isUndefined, toBoolean, toNumber, toString } from "../src/type.ts";

test("toNumber", () => {
  expect(toNumber("42")).toBe(42);
  expect(toNumber(true)).toBe(1);
  expect(toNumber("test")).toBeNaN();
});

test("toString", () => {
  expect(toString(42)).toBe("42");
  expect(toString(true)).toBe("true");
  expect(toString([1, 2])).toBe("1,2");
});

test("toBoolean", () => {
  expect(toBoolean(1)).toBe(true);
  expect(toBoolean("")).toBe(false);
});

test("isArray", () => {
  expect(isArray([])).toBe(true);
  expect(isArray("test")).toBe(false);
});

test("isUndefined", () => {
  expect(isUndefined(head<string>([]))).toBe(true);
  expect(isUndefined(null)).toBe(false);
  expect(isUndefined(0)).toBe(false);
});
