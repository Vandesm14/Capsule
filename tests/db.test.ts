import { DataStore, DataSet } from '../src/lib/db';

let db = new DataStore();

beforeEach(() => {
  db = new DataStore();
  expect(db.size).toBe(0);
});

describe('DataStore', () => {
  describe('core functions', () => {
    describe('create', () => {
      it('create with a string', () => {
        db.create('key', 'value');
        expect(db.size).toBe(1);
        expect(db.has('key')).toBe(true);
        expect(db.read('key')).toEqual(new DataSet(['value']));
      });

      it('create with a set', () => {
        db.create('key', new Set(['foo', 'bar']));
        expect(db.size).toBe(1);
        expect(db.has('key')).toBe(true);
        expect(db.read('key')).toEqual(new DataSet(['foo', 'bar']));
      });

      it('create with a DataSet', () => {
        db.create('key', new DataSet(['foo', 'bar']));
        expect(db.size).toBe(1);
        expect(db.has('key')).toBe(true);
        expect(db.read('key')).toEqual(new DataSet(['foo', 'bar']));
      });

      it('create with an array', () => {
        db.create('key', ['foo', 'bar']);
        expect(db.size).toBe(1);
        expect(db.has('key')).toBe(true);
        expect(db.read('key')).toEqual(new DataSet(['foo', 'bar']));
      });

      it('create using existing key', () => {
        db.create('key', 'value');
        expect(() => db.create('key', 'value2')).toThrow(
          new Error('Key key already exists')
        );
      });
    });

    describe('read', () => {
      it('read', () => {
        db.create('key', 'value');
        expect(db.read('key')).toEqual(new DataSet(['value']));
      });

      it('read with non-existent key', () => {
        expect(db.read('key')).toBeNull();
      });
    });

    describe('update', () => {
      it('update with a string', () => {
        db.create('key', 'value');
        db.update('key', 'value2');
        expect(db.read('key')).toEqual(new DataSet(['value2']));
      });

      it('update with a set', () => {
        db.create('key', 'value');
        db.update('key', new Set(['foo', 'bar']));
        expect(db.read('key')).toEqual(new DataSet(['foo', 'bar']));
      });

      it('update with a DataSet', () => {
        db.create('key', 'value');
        db.update('key', new DataSet(['foo', 'bar']));
        expect(db.read('key')).toEqual(new DataSet(['foo', 'bar']));
      });

      it('update with an array', () => {
        db.create('key', 'value');
        db.update('key', ['foo', 'bar']);
        expect(db.read('key')).toEqual(new DataSet(['foo', 'bar']));
      });

      it('update using non-existent key', () => {
        expect(() => db.update('key2', 'value2')).toThrow(
          new Error('Key key2 does not exist')
        );
      });
    });

    describe('destroy', () => {
      it('destroy', () => {
        db.create('key', 'value');
        expect(db.size).toBe(1);
        expect(db.has('key')).toBe(true);
        db.destroy('key');
        expect(db.size).toBe(0);
        expect(db.has('key')).toBe(false);
      });

      it('destroy using a non-existent key', () => {
        expect(() => db.destroy('key')).toThrow(new Error('Key key does not exist'));
      });
    });
  });

  describe('utility functions', () => {
    describe('rename', () => {
      it('rename', () => {
        db.create('key', 'value');
        const key = db.rename('key', 'new key');
        expect(db.size).toBe(1);
        expect(db.has('key')).toBe(false);
        expect(db.has('new key')).toBe(true);
        expect(db.read('new key')).toEqual(new DataSet(['value']));
        expect(key).toBe('new key');
      });

      it('rename using non-existent key', () => {
        expect(() => db.rename('key', 'new key')).toThrow(
          new Error('Key key does not exist')
        );
      });
    });

    describe('description', () => {
      it('duplicate', () => {
        db.create('key', 'value');
        const key = db.duplicate('key', 'new key');
        expect(db.size).toBe(2);
        expect(db.has('key')).toBe(true);
        expect(db.has('new key')).toBe(true);
        expect(db.read('new key')).toEqual(new DataSet(['value']));
        expect(key).toBe('new key');
      });

      it('duplicate using non-existent key', () => {
        expect(() => db.duplicate('key', 'new key')).toThrow(
          new Error('Key key does not exist')
        );
      });
    });

    describe('merge', () => {
      it('merge', () => {
        db.create('key', 'value');
        db.merge('key', 'new value');
        expect(db.read('key')).toEqual(new DataSet(['value', 'new value']));
      });

      it('merge using non-existent key', () => {
        expect(() => db.merge('key', 'new value')).toThrow(
          new Error('Key key does not exist')
        );
      });
    });

    describe('sort', () => {
      it('sort', () => {
        db.create('key', 'value');
        db.sort('key', (a, b) => a.localeCompare(b));
        expect(db.read('key')).toEqual(new DataSet(['value']));
      });

      it('sort using non-existent key', () => {
        expect(() => db.sort('key', (a, b) => a.localeCompare(b))).toThrow(
          new Error('Key key does not exist')
        );
      });
    });
  });
});


describe('DataSet', () => {
  describe('push', () => {
    it('push a string', () => {
      db.create('key', 'value');
      const set = db.read('key');
      set.push('new value');
      expect(db.read('key')).toEqual(new DataSet(['value', 'new value']));
    });

    it('push a set', () => {
      db.create('key', 'value');
      const set = db.read('key');
      set.push(new DataSet(['foo', 'bar']));
      expect(db.read('key')).toEqual(new DataSet(['value', 'foo', 'bar']));
    });

    it('push an array', () => {
      db.create('key', 'value');
      const set = db.read('key');
      set.push(['foo', 'bar']);
      expect(db.read('key')).toEqual(new DataSet(['value', 'foo', 'bar']));
    });
  });

  describe('pop', () => {
    it('pop', () => {
      db.create('key', ['foo', 'bar']);
      const set = db.read('key');
      set.pop();
      expect(db.read('key')).toEqual(new DataSet(['foo']));
    });

    it('pop with 0 values', () => {
      db.create('key', []);
      const set = db.read('key');
      const result = set.pop();
      expect(db.read('key')).toEqual(new DataSet([]));
      expect(result).toBeNull();
    });
  });

  it('map', () => {
    db.create('key', ['value', 'foo', 'bar']);
    const set = db.read('key');
    const result = set.map((value: string) => value + '!');
    expect(result).toEqual(new DataSet(['value!', 'foo!', 'bar!']));
    expect(db.read('key')).toEqual(new DataSet(['value', 'foo', 'bar']));
  });

  it('filter', () => {
    db.create('key', ['value', 'foo', 'bar']);
    const set = db.read('key');
    const result = set.filter('key', (value: string) => value.includes('a'));
    expect(result).toEqual(new DataSet(['value', 'bar']));
    expect(db.read('key')).toEqual(new DataSet(['value', 'foo', 'bar']));
  });

  it('sort', () => {
    db.create('key', ['value', 'foo', 'bar']);
    const set = db.read('key');
    const result = set.sort('key', (value: string, value2: string) => value.localeCompare(value2));
    expect(result).toEqual(new DataSet(['bar', 'foo', 'value']));
  });
});