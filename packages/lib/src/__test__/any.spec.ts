import { identity } from '../any';

test('identity', () => {
  expect(identity(false)).toBe(false);
  expect(identity('test')).toBe('test');
  expect(identity(42)).toBe(42);
  const arr = [1, 2, 3];
  expect(identity(arr)).toBe(arr);
  const o = { test: 'test' };
  expect(identity(o)).toBe(o);
  expect(identity('test')).not.toBe('fake');
});
