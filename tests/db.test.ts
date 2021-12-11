// @ts-envorinment jest

import db from '../src/lib/db';

beforeAll(() => {
  db.__setTestDB({});
})


test('is empty', () => {
  expect(db.size()).toBe(0);
});

test('set', () => {
  db.set('foo', 'bar');
  expect(db.get('foo')).toBe('bar');
});

test('set multiple', () => {
  db.set('foo', 'bar');
  db.set('bar', 'foo');
  expect(db.get('foo')).toBe('bar');
  expect(db.get('bar')).toBe('foo');
});