import { isBalancedPair, isLeftGreater } from '../pair_misc';

test('isBalancedPair', () => {
  expect(isBalancedPair([0, 0])).toBe(true);
  expect(isBalancedPair([0, 1])).toBe(false);
  expect(isBalancedPair(['test', 'test'])).toBe(true);
  expect(isBalancedPair(['test', 'fake'])).toBe(false);
});

test('isLeftGreater', () => {
  expect(isLeftGreater([0, 0])).toBe(false);
  expect(isLeftGreater([0, 1])).toBe(false);
  expect(isLeftGreater([1, 1])).toBe(false);
  expect(isLeftGreater([1, 0])).toBe(true);
});
