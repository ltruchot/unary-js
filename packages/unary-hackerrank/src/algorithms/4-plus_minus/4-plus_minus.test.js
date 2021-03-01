import plusMinus from './4-plus_minus';

test('Algorithms / Plus Minus - Test case 0', () => {
  const arr = [0, 0, -1, 1, 1];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "0.400000");
  expect(spy).toHaveBeenNthCalledWith(2, "0.200000");
  expect(spy).toHaveBeenNthCalledWith(3, "0.400000");
});

test('Algorithms / Plus Minus - Test case 1', () => {
  const arr = [ -4, 3, -9, 0, 4, 1 ];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "0.500000");
  expect(spy).toHaveBeenNthCalledWith(2, "0.333333");
  expect(spy).toHaveBeenNthCalledWith(3, "0.166667");
});

test('Algorithms / Plus Minus - Test case 2', () => {
  const arr = [1, -2, -7, 9, 1, -8, -5];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "0.428571");
  expect(spy).toHaveBeenNthCalledWith(2, "0.571429");
  expect(spy).toHaveBeenNthCalledWith(3, "0.000000");
});

test('Algorithms / Plus Minus - Test case 3', () => {
  const arr = [0, 4, -3, 3, -6];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "0.400000");
  expect(spy).toHaveBeenNthCalledWith(2, "0.400000");
  expect(spy).toHaveBeenNthCalledWith(3, "0.200000");
});

test('Algorithms / Plus Minus - Test case 4', () => {
  const arr = [55,48,48,45,91,97,45,1,39,54,36,6,19,35,66,36,72,93,38,21,65,70,36,63,39,76,82,26,67,29,24,82,62,53,1,50,47,65,67,19,66,90,77];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "1.000000");
  expect(spy).toHaveBeenNthCalledWith(2, "0.000000");
  expect(spy).toHaveBeenNthCalledWith(3, "0.000000");
});

test('Algorithms / Plus Minus - Test case 5', () => {
  const arr = [0,100,35,0,94,40,42,87,59,0];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "0.700000");
  expect(spy).toHaveBeenNthCalledWith(2, "0.000000");
  expect(spy).toHaveBeenNthCalledWith(3, "0.300000");
});

test('Algorithms / Plus Minus - Test case 6', () => {
  const arr = [0,-67,-74,-38,-72,-53,0,-13,-95,-91,-100,-59,0,-10,-68,-71,-62,-21,0,-42,-57,-16,-66,-23,0,-80,-63,-68,-65,-71,0,-71,-15,-32,-26,-8,0,-6,-51,-87,-19,-71,0,-93,-26,-35,-56,-89,0,-21,-74,-39,-57,-8,0,-69,-29,-24,-99,-53,0,-65,-42,-72,-18,-4,0,-73,-46,-63,-78,-87];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "0.000000");
  expect(spy).toHaveBeenNthCalledWith(2, "0.833333");
  expect(spy).toHaveBeenNthCalledWith(3, "0.166667");
});

test('Algorithms / Plus Minus - Test case 7', () => {
  const arr = [-92,-21,-93,-27,-45,-63,53,45,0,6,-67,84,96,86,18,36,53,0,47,88,91,-59,65,62,3,13,0,-49,-47,94,-63,65,-23,48,-5,0,-10,67,-23,19,-11,46,80,-83,0,-40,74,-63,-20,-72,98,-72,66,0,-58,-1,67,-22,8,-45,32,-65,0,-10,-65,-81,-36,-55,-99,-18,-82];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "0.408451");
  expect(spy).toHaveBeenNthCalledWith(2, "0.492958");
  expect(spy).toHaveBeenNthCalledWith(3, "0.098592");
});

test('Algorithms / Plus Minus - Test case 8', () => {
  const arr = [-6,1,79,17,64,94,87,-77,0,-26,2,-94,87,-81,-73,-28,43,0,-35,39,-37,-49,-29,93,64,54,0,-73,-58,-100,33,-75,-47,35,-7,0,52,-37,-99,58,-23,70,-52,18,0,-79,-38,45,-61,45,51,-48,32,0,-44,-56,29,-74,-1,92,-93,23,0,55,-31,75,-43,20,19,58,-4,0,59,-80,18,-74,81,63,62,-92,0,-23,7,-91,22,-1,38,-73,79,0,-2,90,80,74,-74,-85,-48,31,0,-80];
  const spy = spyOn(global.console, 'log');
  plusMinus(arr);
  expect(spy).toHaveBeenNthCalledWith(1, "0.440000");
  expect(spy).toHaveBeenNthCalledWith(2, "0.450000");
  expect(spy).toHaveBeenNthCalledWith(3, "0.110000");
});


