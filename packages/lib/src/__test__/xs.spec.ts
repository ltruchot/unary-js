import {
  length, head, second, last, tail,
} from '../xs';
import { inc } from '../number_misc';

test('length', () => {
  expect(length([])).toBe(0);
  expect(length(['test'])).toBe(1);
  expect(length([...Array(1_000_000).keys()])).toBe(1_000_000);
  expect(length([1, 2, 3])).not.toBe(42);
});

test('head', () => {
  expect(head([])).toBe(undefined);
  expect(head(['test'])).toBe('test');
  expect(head([...Array(1_000_000).keys()])).toBe(0);
  expect(head([1, 2, 3])).not.toBe(42);
});

test('second', () => {
  expect(second([])).toBe(undefined);
  expect(second(['test'])).toBe(undefined);
  expect(second(['test', 'fake'])).toBe('fake');
  expect(second([...Array(1_000_000).keys()])).toBe(1);
  expect(second([1, 2, 3])).not.toBe(42);
});

test('last', () => {
  expect(last([])).toBe(undefined);
  expect(last(['test'])).toBe('test');
  expect(last(['test', 'fake'])).toBe('fake');
  expect(last([...Array(1_000_000).keys()])).toBe(999_999);
  expect(last([1, 2, 3])).not.toBe(42);
});

test('tail', () => {
  expect(tail([])).toEqual([]);
  expect(tail(['test'])).toEqual([]);
  expect(tail(['test', 'fake'])).toEqual(['fake']);
  expect(tail([...Array(10).keys()])).toEqual([...Array(9).keys()].map(inc));
  expect(tail([1, 2, 3])).not.toEqual(42);
});
