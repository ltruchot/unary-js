type FnBool1 = (b: boolean) => boolean;
export const t: FnBool1 = (_) => true;
test('t', () => {
  expect(t(true)).toBe(true);
  expect(t(false)).toBe(true);
});
export const f: FnBool1 = (_) => false;
test('f', () => {
  expect(f(true)).toBe(false);
  expect(f(false)).toBe(false);
});

export const not: FnBool1 = (b) => !b;
test('not', () => {
  expect(not(true)).toBe(false);
  expect(not(false)).toBe(true);
});

type FnBool2 = (b: boolean) => FnBool1;
export const and: FnBool2 = (b1) => (b2) => b1 && b2;
test('and', () => {
  expect(and(true)(true)).toBe(true);
  expect(and(true)(false)).toBe(false);
  expect(and(false)(true)).toBe(false);
  expect(and(false)(false)).toBe(false);
});

export const nand: FnBool2 = (b1) => (b2) => not(and(b1)(b2));
test('nand', () => {
  expect(nand(true)(true)).toBe(false);
  expect(nand(true)(false)).toBe(true);
  expect(nand(false)(true)).toBe(true);
  expect(nand(false)(false)).toBe(true);
});

export const or: FnBool2 = (b1) => (b2) => b1 || b2;
test('or', () => {
  expect(or(true)(true)).toBe(true);
  expect(or(true)(false)).toBe(true);
  expect(or(false)(true)).toBe(true);
  expect(or(false)(false)).toBe(false);
});

/**
 *
 * @param b1
 * @see https://en.wikipedia.org/wiki/Material_nonimplication
 */
export const without: FnBool2 = (b1) => (b2) => and(b1)(not(b2));
test('without', () => {
  expect(without(true)(true)).toBe(false);
  expect(without(true)(false)).toBe(true);
  expect(without(false)(true)).toBe(false);
  expect(without(false)(false)).toBe(false);
});

export const xor: FnBool2 = (b1) => (b2) => or(without(b1)(b2))(without(b2)(b1));
test('xor', () => {
  expect(xor(true)(true)).toBe(false);
  expect(xor(true)(false)).toBe(true);
  expect(xor(false)(true)).toBe(true);
  expect(xor(false)(false)).toBe(false);
});

export const xor2: FnBool2 = (b1) => (b2) => and(or(b1)(b2))(nand(b1)(b2));
test('xor', () => {
  expect(xor(true)(true)).toBe(false);
  expect(xor(true)(false)).toBe(true);
  expect(xor(false)(true)).toBe(true);
  expect(xor(false)(false)).toBe(false);
});
