import { expect, test } from "vite-plus/test";

import diagonalDifference from "./3-diagonal_difference.ts";
import matrix7 from "./matrix-7.json" with { type: "json" };
import matrix8 from "./matrix-8.json" with { type: "json" };

test("Algorithms / 3 - Diagonal Difference - 1", () => {
  expect(
    diagonalDifference([
      [11, 2, 4],
      [4, 5, 6],
      [10, 8, -12],
    ]),
  ).toBe(15);
});
test("Algorithms / 3 - Diagonal Difference - 2", () => {
  expect(
    diagonalDifference([
      [-1, 1, -7, -8],
      [-10, -8, -5, -2],
      [0, 9, 7, -1],
      [4, 4, -2, 1],
    ]),
  ).toBe(1);
});
test("Algorithms / 3 - Diagonal Difference - 3", () => {
  expect(
    diagonalDifference([
      [6, 6, 7, -10, 9, -3, 8, 9, -1],
      [9, 7, -10, 6, 4, 1, 6, 1, 1],
      [-1, -2, 4, -6, 1, -4, -6, 3, 9],
      [-8, 7, 6, -1, -6, -6, 6, -7, 2],
      [-10, -4, 9, 1, -7, 8, -5, 3, -5],
      [-8, -3, -4, 2, -3, 7, -5, 1, -5],
      [-2, -7, -4, 8, 3, -1, 8, 2, 3],
      [-3, 4, 6, -7, -7, -8, -3, 9, -6],
      [-2, 0, 5, 4, 4, 4, -3, 3, 0],
    ]),
  ).toBe(52);
});

test("Algorithms / 3 - Diagonal Difference - 4", () => {
  expect(
    diagonalDifference([
      [6, 6, 7, -10, 9, -3, 8, 9, -1],
      [9, 7, -10, 6, 4, 1, 6, 1, 1],
      [-1, -2, 4, -6, 1, -4, -6, 3, 9],
      [-8, 7, 6, -1, -6, -6, 6, -7, 2],
      [-10, -4, 9, 1, -7, 8, -5, 3, -5],
      [-8, -3, -4, 2, -3, 7, -5, 1, -5],
      [-2, -7, -4, 8, 3, -1, 8, 2, 3],
      [-3, 4, 6, -7, -7, -8, -3, 9, -6],
      [-2, 0, 5, 4, 4, 4, -3, 3, 0],
    ]),
  ).toBe(52);
});
test("Algorithms / 3 - Diagonal Difference - 5", () => {
  expect(
    diagonalDifference([
      [6, 8],
      [-6, 9],
    ]),
  ).toBe(13);
});
test("Algorithms / 3 - Diagonal Difference - 6", () => {
  expect(
    diagonalDifference([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]),
  ).toBe(0);
});
test("Algorithms / 3 - Diagonal Difference - 7", () => {
  expect(diagonalDifference(matrix7)).toBe(327);
});

test("Algorithms / 3 - Diagonal Difference - 8", () => {
  expect(diagonalDifference(matrix8)).toBe(462);
});
