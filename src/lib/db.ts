type Value = string | number | boolean | null | undefined | object | Value[];

interface db {
  __testMode: boolean;
  __testDB: Record<string, string>;
  __cache: Map<string, Value>;
  setTestDB: (value: Record<string, Value>) => void;
  setTestMode: (isDev: boolean) => void;
  copy: (key: string, newKey: string) => void;
  rename: (key: string, newKey: string) => void;
  sort: (key: string, sort: string) => void;
  type: (key: string) => string;
  has: (key: string) => boolean;
  size: () => void;

  // core functions
  get: (key: string) => Value;
  set: (key: string, value: Value) => void;
  del: (key: string) => void;
  clear: () => void;
  keys: () => string[];
  entries: () => [string, Value][];
}

function get(db: db, key: string): value {
  let value: string;
  if (db.__cache.has(key)) {
    return db.__cache.get(key);
  } else {
    if (db.__testMode) {
      value = db.__testDB[key];
    } else {
      value = localStorage.getItem(key);
    }
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    throw new Error(`Error parsing value for key ${key}`);
  }
}

function set(db: db, key: string, value: Value) {
  if (db.__testMode) {
    db.__testDB[key] = JSON.stringify(value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }

  db.__cache.set(key, value);
}

function del(db: db, key: string) {
  if (db.__testMode) {
    delete db.__testDB[key];
  } else {
    localStorage.removeItem(key);
  }

  db.__cache.delete(key);
}

function clear(db: db) {
  if (db.__testMode) {
    db.__testDB = {};
  } else {
    localStorage.clear();
  }

  db.__cache.clear();
}

function keys(db: db): string[] {
  if (db.__testMode) {
    return Object.keys(db.__testDB);
  } else {
    return Object.keys(localStorage);
  }
}

function entries(db: db): [string, Value][] {
  if (db.__testMode) {
    return Object.entries(db.__testDB);
  } else {
    return Object.entries(localStorage).map(el => {
      if (db.__cache.has(el[0])) {
        return [el[0], db.__cache.get(el[0])];
      } else {
        return [el[0], JSON.parse(el[1])]
      }
    });
  }
}

const db: db = {
  __testMode: false,
  __testDB: {},
  __cache: new Map(),
  setTestDB: (value: Record<string, Value>) => {
    const values: Record<string, string> = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        values[key] = JSON.stringify(value[key]);
      }
    }
    db.__testDB = values;
  },
  setTestMode: (isDev: boolean) => {
    db.__testMode = isDev;
  },
  copy: (key: string, newKey: string) => {
    if (db.has(key)) {
      db.set(newKey, db.get(key));
    }
  },
  rename: (key: string, newKey: string) => {
    if (db.has(key)) {
      db.set(newKey, db.get(key));
      db.del(key);
    }
  },
  sort: (key: string, sort: string) => {
    if (db.has(key)) {
      const value = db.get(key);
      if (Array.isArray(value)) {
        if (sort === 'asc') {
          return value.sort();
        } else if (sort === 'desc') {
          return value.sort().reverse();
        }
      }
    }
    return []
  },
  type: (key: string) => {
    if (db.has(key)) {
      const value = db.get(key);
      if (typeof value === 'string') {
        return 'string';
      } else if (typeof value === 'number') {
        return 'number';
      } else if (typeof value === 'boolean') {
        return 'boolean';
      } else if (value === null) {
        return 'null';
      } else if (value === undefined) {
        return 'undefined';
      } else if (Array.isArray(value)) {
        return 'array';
      } else if (typeof value === 'object') {
        return 'object';
      }
    }
    return 'none';
  },
  has: (key: string) => {
    return db.get(key) !== null;
  },
  size: () => {
    return db.keys().length;
  },

  // core functions
  get: (key: string): Value => {
    return get(db, key);
  },
  set: (key: string, value: Value) => {
    set(db, key, value);
  },
  del: (key: string) => {
    del(db, key);
  },
  clear: () => {
    clear(db);
  },
  keys: () => {
    return keys(db);
  },
  entries: () => {
    return entries(db);
  }
};

export default db;