import { add, inc } from '../number';
import { reduce, map, slice } from '../xs_f';

test('reduce', () => {
  expect(reduce(0)(add)([1, 2, 3])).toBe(6);
});

test('map', () => {
  expect(map(inc)([1, 2, 3])).toEqual([2, 3, 4]);
});

test('slice', () => {
  expect(slice(1)(4)).toEqual([0, 1, 2, 3, 4, 5, 6]);
});
