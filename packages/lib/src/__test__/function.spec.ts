import { identity } from '../any';
import { compose2, compose3 } from '../function';

test('compose2', () => {
  expect(compose2(identity)(identity)('test')).toBe('test');
});

test('compose3', () => {
  expect(compose3(identity)(identity)(identity)('test')).toBe('test');
});
