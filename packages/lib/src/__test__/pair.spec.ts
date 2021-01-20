import { dec, identity, inc } from '../../dist';
import {
  left, right, bmap, lmap, rmap,
} from '../pair';

test('left', () => {
  expect(left([0, 0])).toBe(0);
  expect(left([1, 0])).toBe(1);
  expect(left(['test', 'test'])).toBe('test');
  expect(left(['test', 'fake'])).not.toBe('fake');
});

test('right', () => {
  expect(right([0, 0])).toBe(0);
  expect(right([0, 1])).toBe(1);
  expect(right(['test', 'test'])).toBe('test');
  expect(right(['fake', 'test'])).not.toBe('fake');
});

test('bmap', () => {
  expect(bmap(identity)(identity)([0, 0])).toEqual([0, 0]);
  expect(bmap(identity)(identity)([1, 0])).toEqual([1, 0]);
  expect(bmap(inc)(inc)([1, 0])).toEqual([2, 1]);
  expect(bmap(dec)(inc)([1, 0])).toEqual([0, 1]);
});

test('lmap', () => {
  expect(lmap(identity)([0, 0])).toEqual([0, 0]);
  expect(lmap(identity)([1, 0])).toEqual([1, 0]);
  expect(lmap(inc)([1, 0])).toEqual([2, 0]);
  expect(lmap(dec)([1, 0])).toEqual([0, 0]);
});

test('rmap', () => {
  expect(rmap(identity)([0, 0])).toEqual([0, 0]);
  expect(rmap(identity)([1, 1])).toEqual([1, 1]);
  expect(rmap(inc)([1, 0])).toEqual([1, 1]);
  expect(rmap(dec)([1, 1])).toEqual([1, 0]);
});
