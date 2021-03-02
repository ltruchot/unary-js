import { eq0 } from '../number_misc';

test('tap', () => {
  expect(eq0(0)).toBe(true);
  expect(eq0(1)).toBe(false);
  expect(eq0(999999)).toBe(false);
});
