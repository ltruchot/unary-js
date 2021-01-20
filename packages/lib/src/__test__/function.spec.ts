import { identity } from '../any';
import { compose } from '../function';

test('compose', () => {
  expect(compose(identity)(identity)('test')).toBe('test');
});
