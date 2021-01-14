import { add, sub, mul } from '../number';

test('add', () => {
  expect(add(0)(1)).toBe(1);
  expect(add(2)(40)).toBe(42);
});

test('sub', () => {
  expect(sub(0)(1)).toBe(1);
  expect(sub(2)(44)).toBe(42);
});

test('mul', () => {
  expect(mul(0)(1)).toBe(0);
  expect(mul(1)(1)).toBe(1);
  expect(mul(1)(42)).toBe(42);
  expect(mul(2)(21)).toBe(42);
});
