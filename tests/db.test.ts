import { Suite, assert } from '@nullify/testing';
import db from '../src/lib/localRedis';

const { test: _test, end } = Suite.create('Local Redis');

const test = async (name: string, fn: () => Promise<void> | void) => {
  db.__setTestDB({});
  _test(name, fn);
}

db.__setTestMode(true);

test('is empty', () => {
  assert.equal(db.size(), 0);
});

test('set', () => {
  db.set('foo', 'bar');
  assert.equal(db.get('foo'), 'bar');
});

test('set multiple', () => {
  db.set('foo', 'bar');
  db.set('bar', 'foo');
  assert.equal(db.get('foo'), 'bar');
  assert.equal(db.get('bar'), 'foo');
});



export default await end;