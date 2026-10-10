import { expect, test } from "vite-plus/test";

import {
  abs,
  dec,
  dropDecimal,
  eq0,
  gt0,
  inc,
  isMultipleOf,
  lt0,
  round,
  roundFloat,
} from "../src/number_misc.ts";

test("inc", () => {
  expect(inc(41)).toBe(42);
});

test("dec", () => {
  expect(dec(43)).toBe(42);
});

test("eq0", () => {
  expect(eq0(0)).toBe(true);
  expect(eq0(1)).toBe(false);
  expect(eq0(999_999)).toBe(false);
});

test("lt0", () => {
  expect(lt0(-1)).toBe(true);
  expect(lt0(0)).toBe(false);
  expect(lt0(1)).toBe(false);
});

test("gt0", () => {
  expect(gt0(1)).toBe(true);
  expect(gt0(0)).toBe(false);
  expect(gt0(-1)).toBe(false);
});

test("isMultipleOf", () => {
  expect(isMultipleOf(3)(9)).toBe(true);
  expect(isMultipleOf(3)(10)).toBe(false);
  expect(isMultipleOf(3)(0)).toBe(true);
});

test("abs", () => {
  expect(abs(-42)).toBe(42);
  expect(abs(42)).toBe(42);
  expect(abs(0)).toBe(0);
});

test("dropDecimal", () => {
  expect(dropDecimal(42.9)).toBe(42);
  expect(dropDecimal(-42.9)).toBe(-42);
  expect(dropDecimal(42)).toBe(42);
  // Numbers written in exponent notation.
  expect(dropDecimal(1e21)).toBe(1e21);
  expect(dropDecimal(1e-7)).toBe(0);
});

test("round", () => {
  expect(round(1.4)).toBe(1);
  expect(round(1.5)).toBe(2);
  expect(round(-1.4)).toBe(-1);
  // Halves round away from zero: Math.round(-1.5) is -1.
  expect(round(-1.5)).toBe(-2);
  expect(round(1e21)).toBe(1e21);
});

test("roundFloat", () => {
  expect(roundFloat(2)(1.2345)).toBe(1.23);
  expect(roundFloat(1)(231.7888)).toBe(231.8);
  expect(roundFloat(0)(231.7888)).toBe(232);
  expect(roundFloat(2)(-1.239)).toBe(-1.24);
});
