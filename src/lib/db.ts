type Value = string | number | boolean | null | undefined | object | Value[];

interface db {
  __testMode: boolean;
  __testDB: Record<string, Value>;
  __setTestDB: (value: Record<string, Value>) => void;
  __setTestMode: (isDev: boolean) => void;
  copy: (key: string, newKey: string) => void;
  rename: (key: string, newKey: string) => void;
  sort: (key: string, sort: string) => void;
  type: (key: string) => string;
  has: (key: string) => boolean;
  size: () => void;
  get: (key: string) => Value;
  keys: () => string[];
  set: (key: string, value: Value) => void;
  del: (key: string) => void;
}

const db: db = {
  __testMode: false,
  __testDB: {},
  __setTestDB: (value: Record<string, Value>) => {
    db.__testDB = value;
  },
  __setTestMode: (isDev: boolean) => {
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
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      throw new Error(`Error parsing value for key ${key}`);
    }
  },
  keys: () => {
    if (db.__testMode) {
      return Object.keys(db.__testDB);
    } else {
      return Object.keys(localStorage);
    }
  },
  set: (key: string, value: Value) => {
    if(db.__testMode) {
      db.__testDB[key] = JSON.stringify(value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  del: (key: string) => {
    if(db.__testMode) {
      delete db.__testDB[key];
    } else {
      localStorage.removeItem(key);
    }
  },
};

export default db;