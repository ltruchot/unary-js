import { expect, test } from "vite-plus/test";

import {
  add,
  div,
  gt,
  gte,
  isFinite,
  lt,
  lte,
  mod,
  mul,
  negate,
  parseIntWithRadix,
  pow,
  sub,
} from "../src/number.ts";

test("negate", () => {
  expect(negate(42)).toBe(-42);
  expect(negate(-42)).toBe(42);
});

test("add", () => {
  expect(add(0)(1)).toBe(1);
  expect(add(2)(40)).toBe(42);
});

test("sub", () => {
  expect(sub(0)(1)).toBe(1);
  expect(sub(2)(44)).toBe(42);
});

test("mul", () => {
  expect(mul(0)(1)).toBe(0);
  expect(mul(1)(1)).toBe(1);
  expect(mul(1)(42)).toBe(42);
  expect(mul(2)(21)).toBe(42);
});

test("div", () => {
  expect(div(2)(84)).toBe(42);
  expect(div(0)(1)).toBe(Infinity);
});

test("pow", () => {
  expect(pow(2)(10)).toBe(100);
  expect(pow(0)(42)).toBe(1);
});

test("mod", () => {
  expect(mod(5)(47)).toBe(2);
  expect(mod(5)(-47)).toBe(-2);
});

test("gt", () => {
  expect(gt(0)(1)).toBe(true);
  expect(gt(0)(0)).toBe(false);
  expect(gt(0)(-1)).toBe(false);
});

test("gte", () => {
  expect(gte(0)(1)).toBe(true);
  expect(gte(0)(0)).toBe(true);
  expect(gte(0)(-1)).toBe(false);
});

test("lt", () => {
  expect(lt(0)(1)).toBe(false);
  expect(lt(0)(0)).toBe(false);
  expect(lt(0)(-1)).toBe(true);
});

test("lte", () => {
  expect(lte(0)(1)).toBe(false);
  expect(lte(0)(0)).toBe(true);
  expect(lte(0)(-1)).toBe(true);
});

test("isFinite", () => {
  expect(isFinite(42)).toBe(true);
  expect(isFinite(Infinity)).toBe(false);
  expect(isFinite(Number.NaN)).toBe(false);
});

test("parseIntWithRadix", () => {
  expect(parseIntWithRadix(10)(42.9)).toBe(42);
  expect(parseIntWithRadix(2)(101)).toBe(5);
});
