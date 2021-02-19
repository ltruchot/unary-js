import plusMinus from './4-plus_minus';
/*
test('Algorithms / 4 - Plus Minus - Test case 0', () => {
  const arr = [0, 0, -1, 1, 1];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "0.400000");
  expect(spy).toHaveBeenNthCalledWith(2, "0.200000");
  expect(spy).toHaveBeenNthCalledWith(3, "0.400000");
});
*/

test('Algorithms / 4 - Plus Minus - Test case 1', () => {
  const arr = [ -4, 3, -9, 0, 4, 1 ];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "0.500000");
  expect(spy).toHaveBeenNthCalledWith(2, "0.333333");
  expect(spy).toHaveBeenNthCalledWith(3, "0.166667");
});
