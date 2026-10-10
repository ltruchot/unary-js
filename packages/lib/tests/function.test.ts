import { expect, test } from "vite-plus/test";

import { identity } from "../src/any.ts";
import { applyTo, compose2, compose3 } from "../src/function.ts";
import { mul } from "../src/number.ts";
import { inc } from "../src/number_misc.ts";
import { toString } from "../src/type.ts";

test("compose2", () => {
  expect(compose2(identity)(identity)("test")).toBe("test");
  // Right to left: the increment runs first.
  expect(compose2(mul(2))(inc)(20)).toBe(42);
});

test("compose3", () => {
  expect(compose3(identity)(identity)(identity)("test")).toBe("test");
  expect(compose3(toString)(mul(2))(inc)(20)).toBe("42");
});

test("applyTo", () => {
  expect(applyTo(41)(inc)).toBe(42);
});
