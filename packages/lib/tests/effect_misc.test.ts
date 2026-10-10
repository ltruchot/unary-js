import { afterEach, expect, test, vi } from "vite-plus/test";

import { forEach, log, logEach, tap } from "../src/effect_misc.ts";

afterEach(() => {
  vi.restoreAllMocks();
});

const silentLog = () => vi.spyOn(console, "log").mockImplementation(() => {});

test("log", () => {
  const spy = silentLog();
  log("test");
  expect(spy).toHaveBeenCalledExactlyOnceWith("test");
});

test("tap", () => {
  const spy = silentLog();
  expect(tap(log)("test")).toBe("test");
  expect(spy).toHaveBeenCalledWith("test");
});

test("forEach", () => {
  const seen: number[] = [];
  expect(forEach((n: number) => seen.push(n))([1, 2, 3])).toEqual([]);
  expect(seen).toEqual([1, 2, 3]);
});

test("logEach", () => {
  const spy = silentLog();
  expect(logEach([42, "test", true])).toEqual([]);
  expect(spy).toHaveBeenNthCalledWith(1, 42);
  expect(spy).toHaveBeenNthCalledWith(2, "test");
  expect(spy).toHaveBeenNthCalledWith(3, true);
});
