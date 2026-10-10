import { expect, test } from "vite-plus/test";

import { and, f, nand, nor, not, or, t, without, xor, xor2, xor3 } from "../src/boolean.ts";

test("t", () => {
  expect(t(true)).toBe(true);
  expect(t(false)).toBe(true);
});

test("f", () => {
  expect(f(true)).toBe(false);
  expect(f(false)).toBe(false);
});

test("not", () => {
  expect(not(true)).toBe(false);
  expect(not(false)).toBe(true);
});

test("and", () => {
  expect(and(true)(true)).toBe(true);
  expect(and(true)(false)).toBe(false);
  expect(and(false)(true)).toBe(false);
  expect(and(false)(false)).toBe(false);
});

test("nand", () => {
  expect(nand(true)(true)).toBe(false);
  expect(nand(true)(false)).toBe(true);
  expect(nand(false)(true)).toBe(true);
  expect(nand(false)(false)).toBe(true);
});

test("or", () => {
  expect(or(true)(true)).toBe(true);
  expect(or(true)(false)).toBe(true);
  expect(or(false)(true)).toBe(true);
  expect(or(false)(false)).toBe(false);
});

test("nor", () => {
  expect(nor(true)(true)).toBe(false);
  expect(nor(true)(false)).toBe(false);
  expect(nor(false)(true)).toBe(false);
  expect(nor(false)(false)).toBe(true);
});

test("without", () => {
  expect(without(true)(true)).toBe(false);
  expect(without(true)(false)).toBe(true);
  expect(without(false)(true)).toBe(false);
  expect(without(false)(false)).toBe(false);
});

test.each([
  { name: "xor", fn: xor },
  { name: "xor2", fn: xor2 },
  { name: "xor3", fn: xor3 },
])("$name", ({ fn }) => {
  expect(fn(true)(true)).toBe(false);
  expect(fn(true)(false)).toBe(true);
  expect(fn(false)(true)).toBe(true);
  expect(fn(false)(false)).toBe(false);
});
