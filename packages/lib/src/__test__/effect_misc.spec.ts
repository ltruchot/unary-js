import { log, tap, logEach } from '../effect_misc';

test('tap', () => {
  const spy = spyOn(global.console, 'log');
  expect(tap(log)('test')).toBe('test');
  expect(spy).toHaveBeenCalledWith('test');
});

test('logEach', () => {
  const spy = spyOn(global.console, 'log');
  expect(logEach([42, 'test', true])).toEqual([]);
  expect(spy).toHaveBeenNthCalledWith(1, 42);
  expect(spy).toHaveBeenNthCalledWith(2, 'test');
  expect(spy).toHaveBeenNthCalledWith(3, true);
});
