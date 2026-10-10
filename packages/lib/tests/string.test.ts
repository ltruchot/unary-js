import { expect, test } from "vite-plus/test";

import { charAt, strConcat } from "../src/string.ts";
import { join, padEnd, padStart, split, strLength } from "../src/string_misc.ts";

test("strConcat", () => {
  expect(strConcat("b")("a")).toBe("ab");
  expect(strConcat("")("a")).toBe("a");
});

test("charAt", () => {
  expect(charAt(0)("ab")).toBe("a");
  expect(charAt(1)("ab")).toBe("b");
  expect(charAt(2)("ab")).toBe("");
});

test("strLength", () => {
  expect(strLength("")).toBe(0);
  expect(strLength("test")).toBe(4);
});

test("split", () => {
  expect(split("")).toEqual([]);
  expect(split("abc")).toEqual(["a", "b", "c"]);
});

test("join", () => {
  expect(join("-")([])).toBe("");
  expect(join("-")(["a"])).toBe("a");
  expect(join("-")(["a", "b", "c"])).toBe("a-b-c");
  expect(join("")(["a", "b", "c"])).toBe("abc");
});

test("padEnd", () => {
  expect(padEnd("0")(4)("12")).toBe("1200");
  expect(padEnd("0")(2)("12")).toBe("12");
  // Already longer than asked: unchanged.
  expect(padEnd("0")(1)("12")).toBe("12");
  // Nothing to pad with: unchanged.
  expect(padEnd("")(4)("12")).toBe("12");
});

test("padStart", () => {
  expect(padStart("0")(4)("12")).toBe("0012");
  expect(padStart("0")(1)("12")).toBe("12");
  expect(padStart("")(4)("12")).toBe("12");
});
