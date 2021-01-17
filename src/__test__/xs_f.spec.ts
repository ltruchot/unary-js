import { add } from '../number';
import { inc } from '../number_misc';
import {
  reduce, map, slice, zip,
} from '../xs_f';

test('reduce', () => {
  expect(reduce(0)(add)([1, 2, 3])).toBe(6);
});

test('map', () => {
  expect(map(inc)([1, 2, 3])).toEqual([2, 3, 4]);
});

test('slice', () => {
  expect(slice(1)(4)([0, 1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3]);
});

test('zip', () => {
  expect(zip([5, 6, 7, 8])([1, 2, 3, 4])).toEqual([[1, 5], [2, 6], [3, 7], [4, 8]]);
});
