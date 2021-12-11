// a redis-like wrapper for local storage

const db = {
  copy: (key, newKey) => {
    if (db.has(key)) {
      db.set(newKey, db.get(key))
    }
  },
  get: (key: string) => {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      throw new Error(`Error parsing value for key ${key}`);
    }
  },
  has: (key: string) => {
    return localStorage.getItem(key) !== null;
  },
  keys: () => {
    return Object.keys(localStorage);
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  }
};

export default db;