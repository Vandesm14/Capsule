import { DataStore } from '../src/lib/db';

let db = new DataStore();

beforeEach(() => {
  db = new DataStore();
  expect(db.size).toBe(0);
});

describe('DataStore', () => {
  describe('core functions', () => {
    it('create with a string', () => {
      db.create('key', 'value');
      expect(db.size).toBe(1);
      expect(db.has('key')).toBe(true);
      expect(db.read('key')).toEqual(new Set(['value']));
    });

    it('create with a set', () => {
      db.create('key', new Set(['foo', 'bar']));
      expect(db.size).toBe(1);
      expect(db.has('key')).toBe(true);
      expect(db.read('key')).toEqual(new Set(['foo', 'bar']));
    });

    it('create with an array', () => {
      db.create('key', ['foo', 'bar']);
      expect(db.size).toBe(1);
      expect(db.has('key')).toBe(true);
      expect(db.read('key')).toEqual(new Set(['foo', 'bar']));
    });

    it('read', () => {
      db.create('key', 'value');
      expect(db.read('key')).toEqual(new Set(['value']));
    });

    it('update', () => {
      db.create('key', 'value');
      db.update('key', 'new value');
      expect(db.read('key')).toEqual(new Set(['new value']));
    });

    it('destroy', () => {
      db.create('key', 'value');
      expect(db.size).toBe(1);
      expect(db.has('key')).toBe(true);
      db.destroy('key');
      expect(db.size).toBe(0);
      expect(db.has('key')).toBe(false);
    });
  });

  describe('utility functions', () => {
    it('rename', () => {
      db.create('key', 'value');
      const key = db.rename('key', 'new key');
      expect(db.size).toBe(1);
      expect(db.has('key')).toBe(false);
      expect(db.has('new key')).toBe(true);
      expect(db.read('new key')).toEqual(new Set(['value']));
      expect(key).toBe('new key');
    });

    it('duplicate', () => {
      db.create('key', 'value');
      const key = db.duplicate('key', 'new key');
      expect(db.size).toBe(2);
      expect(db.has('key')).toBe(true);
      expect(db.has('new key')).toBe(true);
      expect(db.read('new key')).toEqual(new Set(['value']));
      expect(key).toBe('new key');
    });
  });

  describe('set-level functions', () => {
    it('push a string', () => {
      db.create('key', 'value');
      db.push('key', 'new value');
      expect(db.read('key')).toEqual(new Set(['value', 'new value']));
    });

    it('push a set', () => {
      db.create('key', 'value');
      db.push('key', new Set(['foo', 'bar']));
      expect(db.read('key')).toEqual(new Set(['value', 'foo', 'bar']));
    });

    it('push an array', () => {
      db.create('key', 'value');
      db.push('key', ['foo', 'bar']);
      expect(db.read('key')).toEqual(new Set(['value', 'foo', 'bar']));
    });

    it('pop', () => {
      db.create('key', ['foo', 'bar']);
      db.pop('key');
      expect(db.read('key')).toEqual(new Set(['foo']));
    });

    it('map', () => {
      db.create('key', ['value', 'foo', 'bar']);
      const result = db.map('key', (value: string) => value + '!');
      expect(result).toEqual(new Set(['value!', 'foo!', 'bar!']));
    });

    it('filter', () => {
      db.create('key', ['value', 'foo', 'bar']);
      const result = db.filter('key', (value: string) => value.includes('a'));
      expect(result).toEqual(new Set(['value', 'bar']));
    });

    it('sort', () => {
      db.create('key', ['value', 'foo', 'bar']);
      const result = db.sort('key', (value: string, value2: string) => value.localeCompare(value2));
      expect(result).toEqual(new Set(['bar', 'foo', 'value']));
    });
  });
});
