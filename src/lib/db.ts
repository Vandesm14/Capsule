export type Value = string | Set<string> | string[];

class DataSet extends Set<string> {
  
}

export class DataStore extends Map<string, Set<string>> {
  // core functions
  create<T extends Value>(key: string, value: T): T {
    if (this.has(key)) {
      throw new Error(`Key ${key} already exists`);
    } else {
      let _value: Set<string>;
      if (typeof value === 'string') {
        _value = new Set([value]);
      } else if (value instanceof Set) {
        _value = value;
      } else {
        _value = new Set(value);
      }
      this.set(key, _value);
      return value;
    }
  }
  read(key: string): Set<string> | null {
    if (this.has(key)) {
      return this.get(key);
    } else {
      return null;
    }
  }
  update<T extends Value>(key: string, value: T): T {
    if (this.has(key)) {
      let _value: Set<string>;
      if (typeof value === 'string') {
        _value = new Set([value]);
      } else if (value instanceof Set) {
        _value = value;
      } else {
        _value = new Set(value);
      }
      this.set(key, _value);
      return value;
    } else {
      throw new Error(`Key ${key} does not exist`);
    }
  }
  destroy(key: string): void {
    if (this.has(key)) {
      this.delete(key);
    } else {
      throw new Error(`Key ${key} does not exist`);
    }
  }

  // utility functions
  rename<K extends string>(oldKey: string, newKey: K): K {
    if (this.has(oldKey)) {
      this.set(newKey, this.get(oldKey));
      this.delete(oldKey);
      return newKey;
    } else {
      throw new Error(`Key ${oldKey} does not exist`);
    }
  }
  duplicate<K extends string>(key: string, newKey: K): K {
    if (this.has(key)) {
      this.set(newKey, this.get(key));
      return newKey;
    } else {
      throw new Error(`Key ${key} does not exist`);
    }
  }

  // set-level functions
  push(key: string, value: Value): Set<string> {
    if (this.has(key)) {
      let _value: Set<string>;
      if (typeof value === 'string') {
        _value = new Set([value]);
      } else if (value instanceof Set) {
        _value = value;
      } else {
        _value = new Set(value);
      }
      const set = this.get(key);
      for (const item of _value) {
        set.add(item);
      }
      this.set(key, set);
      return set;
    } else {
      throw new Error(`Key ${key} does not exist`);
    }
  }

  pop(key: string): Set<string> | null {
    if (this.has(key)) {
      const set = this.get(key);
      if (set.size > 0) {
        const item = Array.from(set)[set.size - 1];
        set.delete(item);
        this.set(key, set);
        return set;
      } else {
        throw new Error(`Key ${key} is empty`);
      }
    } else {
      throw new Error(`Key ${key} does not exist`);
    }
  }

  map(key: string, fn: (value: string) => string): Set<string> {
    if (this.has(key)) {
      const set = this.get(key);
      const newSet = new Set<string>();
      for (const item of set) {
        newSet.add(fn(item));
      }
      this.set(key, newSet);
      return newSet;
    } else {
      throw new Error(`Key ${key} does not exist`);
    }
  }

  filter(key: string, fn: (value: string) => boolean): Set<string> {
    if (this.has(key)) {
      const set = this.get(key);
      const newSet = new Set<string>();
      for (const item of set) {
        if (fn(item)) {
          newSet.add(item);
        }
      }
      this.set(key, newSet);
      return newSet;
    } else {
      throw new Error(`Key ${key} does not exist`);
    }
  }

  sort(key: string, fn: (value: string, value2: string) => number): Set<string> {
    // sort using quick sort
    if (this.has(key)) {
      const set = this.get(key);
      const newSet = new Set<string>();
      const sort = (arr: string[]): string[] => {
        if (arr.length <= 1) {
          return arr;
        }
        const pivot = arr[0];
        const left = arr.slice(1).filter((item) => fn(item, pivot) <= 0);
        const right = arr.slice(1).filter((item) => fn(item, pivot) > 0);
        return sort(left).concat([pivot]).concat(sort(right));
      };
      for (const item of sort(Array.from(set))) {
        newSet.add(item);
      }
      this.set(key, newSet);
      return newSet;
    } else {
      throw new Error(`Key ${key} does not exist`);
    }
  }
}