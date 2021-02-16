import { safeY2 } from '../tco';

test('safeY2', () => {
  const safeFactorial = safeY2((fact) => (n) => (acc) => (n === 0 ? acc : fact(n - 1)(n * acc)));
  expect(safeFactorial(100)(1)).toBe(9.332621544394418e+157);
});
