import {
  identity, log,
} from './any';

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

test('log', () => {
  expect(log(false)).toBe(false);
  expect(log('test')).toBe('test');
  expect(log(42)).toBe(42);
  const arr = [1, 2, 3];
  expect(log(arr)).toBe(arr);
  const o = { test: 'test' };
  expect(log(o)).toBe(o);
  expect(log('test')).not.toBe('fake');
});
