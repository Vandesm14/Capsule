// @ts-envorinment jest

import db from '../src/lib/db';

beforeEach(() => {
  db.clear();
  expect(db.size()).toBe(0);
})

test('db starts blank', () => {
  expect(db.__testDB).toEqual({});
});

describe('db tests', () => {
  test('is empty (size)', () => {
    expect(db.size()).toBe(0);
  });

  test('set', () => {
    db.set('foo', 'bar');
    expect(db.size()).toBe(1);
  });

  test('set multiple', () => {
    db.set('foo', 'bar');
    db.set('bar', 'foo');
    expect(db.size()).toBe(2);
  });

  test('get', () => {
    db.set('foo', 'bar');
    db.set('bar', 'foo');
    expect(db.get('foo')).toBe('bar');
    expect(db.get('bar')).toBe('foo');
  });

  test('copy', () => {
    db.set('foo', 'bar');
    db.copy('foo', 'bar');
    expect(db.get('foo')).toBe('bar');
    expect(db.get('bar')).toBe('bar');
  })

  test('rename', () => {
    db.set('foo', 'bar');
    db.rename('foo', 'bar');
    expect(db.get('foo')).toBe(null);
    expect(db.get('bar')).toBe('bar');
  });

  test.skip('sort', () => {
    // db.set('foo', 'bar');
    // db.set('bar', 'foo');
    // db.sort();
    // expect(db.keys()).toEqual(['bar', 'foo']);
  });

  test('type', () => {
    db.set('foo', 'bar');
    expect(db.type('foo')).toBe('string');
    db.set('foo', 123);
    expect(db.type('foo')).toBe('number');
    db.set('foo', true);
    expect(db.type('foo')).toBe('boolean');
    db.set('foo', {});
    expect(db.type('foo')).toBe('object');
    db.set('foo', []);
    expect(db.type('foo')).toBe('array');
    db.set('foo', null);
    expect(db.type('foo')).toBe('none');
  });

  test('has', () => {
    db.set('foo', 'bar');
    expect(db.has('foo')).toBe(true);
    expect(db.has('bar')).toBe(false);
  });

  test('size', () => {
    db.set('foo', 'bar');
    expect(db.size()).toBe(1);

    db.set('bar', 'foo');
    expect(db.size()).toBe(2);
  });

  test('keys', () => {
    db.set('foo', 'bar');
    db.set('bar', 'foo');
    expect(db.keys()).toEqual(['foo', 'bar']);
  });

  test('del', () => {
    db.set('foo', 'bar');
    db.set('bar', 'foo');
    expect(db.size()).toBe(2);
    db.del('foo');
    expect(db.size()).toBe(1);
    expect(db.get('foo')).toBe(null);
  });

  test('clear', () => {
    db.set('foo', 'bar');
    db.set('bar', 'foo');
    expect(db.size()).toBe(2);
    db.clear();
    expect(db.size()).toBe(0);
  });
});