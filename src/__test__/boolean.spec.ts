import {
  and, f, nand, nor, not, or, t, without, xor, xor2, xor3, 
} from '../boolean';

test('t', () => {
  expect(t(true)).toBe(true);;
  expect(t(false)).toBe(true);
});

test('f', () => {
  expect(f(true)).toBe(false);
  expect(f(false)).toBe(false);
});

test('not', () => {
  expect(not(true)).toBe(false);
  expect(not(false)).toBe(true);
});

test('and', () => {
    expect(and(true)(true)).toBe(true);
  expect(and(true)(false)).toBe(false);
  expect(and(false)(true)).toBe(false);
  expect(and(false)(false)).toBe(false);
});

test('nand', () => {
  expect(nand(true)(true)).toBe(false);
  expect(nand(true)(false)).toBe(true);
  expect(nand(false)(true)).toBe(true);
  expect(nand(false)(false)).toBe(true);
});

test('or', () => {
  expect(or(true)(true)).toBe(true);
  expect(or(true)(false)).toBe(true);
  expect(or(false)(true)).toBe(true);
  expect(or(false)(false)).toBe(false);
});

test('nor', () => {
  expect(nor(true)(true)).toBe(false);
  expect(nor(true)(false)).toBe(false);
  expect(nor(false)(true)).toBe(false);
  expect(nor(false)(false)).toBe(true);
});

test('without', () => {
  expect(without(true)(true)).toBe(false);
  expect(without(true)(false)).toBe(true);
  expect(without(false)(true)).toBe(false);
  expect(without(false)(false)).toBe(false);
});

test('xor', () => {
  expect(xor(true)(true)).toBe(false);
  expect(xor(true)(false)).toBe(true);
  expect(xor(false)(true)).toBe(true);
  expect(xor(false)(false)).toBe(false);
});

test('xor2', () => {
  expect(xor2(true)(true)).toBe(false);
  expect(xor2(true)(false)).toBe(true);
  expect(xor2(false)(true)).toBe(true);
  expect(xor2(false)(false)).toBe(false);
});

test('xor3', () => {
  expect(xor3(true)(true)).toBe(false);
  expect(xor3(true)(false)).toBe(true);
  expect(xor3(false)(true)).toBe(true);
  expect(xor3(false)(false)).toBe(false);
});
