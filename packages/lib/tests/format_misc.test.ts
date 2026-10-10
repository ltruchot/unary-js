import { expect, test } from "vite-plus/test";

import { toFixed } from "../src/format_misc.ts";

test("toFixed", () => {
  expect(toFixed(1)(231.7888)).toBe("231.8");
  expect(toFixed(2)(231.7888)).toBe("231.79");
  expect(toFixed(3)(231.7888)).toBe("231.789");
  expect(toFixed(5)(231.7888)).toBe("231.78880");
  expect(toFixed(10)(231.7888)).toBe("231.7888000000");
});

test("toFixed: no decimals, no trailing dot", () => {
  expect(toFixed(0)(231.7888)).toBe("232");
  expect(toFixed(0)(0)).toBe("0");
});

test("toFixed: integers and small numbers", () => {
  expect(toFixed(2)(42)).toBe("42.00");
  expect(toFixed(2)(0.005)).toBe("0.01");
  expect(toFixed(6)(1 / 6)).toBe("0.166667");
  // Written 1e-7 by toString.
  expect(toFixed(10)(0.000_000_1)).toBe("0.0000001000");
  expect(toFixed(2)(0.000_000_1)).toBe("0.00");
});

test("toFixed: negative numbers", () => {
  expect(toFixed(2)(-1.239)).toBe("-1.24");
  expect(toFixed(2)(-0.001)).toBe("-0.00");
});

test("toFixed: as Number.prototype.toFixed, away from a tie", () => {
  for (const n of [0, 1, -1, 0.1, 12.345_678, -987.654_321, 1e-9, 123_456_789.123]) {
    for (const precision of [0, 1, 2, 6]) {
      expect(toFixed(precision)(n)).toBe(n.toFixed(precision));
    }
  }
});

test("toFixed: what cannot be scaled", () => {
  expect(toFixed(2)(Number.NaN)).toBe("NaN");
  expect(toFixed(2)(Infinity)).toBe("Infinity");
  expect(toFixed(2)(1e21)).toBe("1e+21");
});
