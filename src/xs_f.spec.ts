import { add, inc } from './number';
import { reduce, map } from './xs_f';

test('reduce', () => {
  expect(reduce(0)(add)([1, 2, 3])).toBe(6);
});

test('map', () => {
  expect(map(inc)([1, 2, 3])).toEqual([2, 3, 4]);
});
