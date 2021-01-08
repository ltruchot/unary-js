import { add } from './number';
import { reduce } from './xs_f';

test('reduce', () => {
  expect(reduce(0)(add)([1, 2, 3])).toBe(6);
});
