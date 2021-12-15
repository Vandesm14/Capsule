export type Value = string | string[] | Set<string> | DataSet;

export class DataSet extends Set<string> {
  push(value: Value): DataSet {
    let _value: DataSet;
    if (typeof value === 'string') {
      _value = new DataSet([value]);
    } else if (value instanceof DataSet) {
      _value = value;
    } else {
      _value = new DataSet(value);
    }
    for (const item of _value) {
      this.add(item);
    }
    return this;
  }

  pop(): DataSet | null {
    if (this.size > 0) {
      const item = Array.from(this)[this.size - 1];
      this.delete(item);
      return this;
    } else {
      return null;
    }
  }

  map(fn: (value: string) => string): DataSet {
    const newSet = new DataSet();
    for (const item of this) {
      newSet.add(fn(item));
    }
    return newSet;
  }

  filter(key: string, fn: (value: string) => boolean): DataSet {
    const newSet = new DataSet();
    for (const item of this) {
      if (fn(item)) {
        newSet.add(item);
      }
    }
    return newSet;
  }

  sort(key: string, fn: (value: string, value2: string) => number): DataSet {
    const newSet = new DataSet();
    const sort = (arr: string[]): string[] => {
      if (arr.length <= 1) {
        return arr;
      }
      const pivot = arr[0];
      const left = arr.slice(1).filter((item) => fn(item, pivot) <= 0);
      const right = arr.slice(1).filter((item) => fn(item, pivot) > 0);
      return sort(left).concat([pivot]).concat(sort(right));
    };
    for (const item of sort(Array.from(this))) {
      newSet.add(item);
    }
    this.clear();
    for (const item of newSet) {
      this.add(item);
    }
    return newSet;
  }
}

export class DataStore extends Map<string, DataSet> {
  _exist(key: string): Error {
    return new Error(`Key ${key} already exists`);
  }
  _notExist(key: string): Error {
    return new Error(`Key ${key} does not exist`);
  }

  // core functions
  create<T extends Value>(key: string, value: T): T {
    if (this.has(key)) {
      throw this._exist(key);
    } else {
      let _value: DataSet;
      if (typeof value === 'string') {
        _value = new DataSet([value]);
      } else if (value instanceof DataSet) {
        _value = value;
      } else {
        _value = new DataSet(value);
      }
      this.set(key, _value);
      return value;
    }
  }
  read(key: string): DataSet | null {
    if (this.has(key)) {
      return this.get(key);
    } else {
      return null;
    }
  }
  update<T extends Value>(key: string, value: T): T {
    if (this.has(key)) {
      let _value: DataSet;
      if (typeof value === 'string') {
        _value = new DataSet([value]);
      } else if (value instanceof DataSet) {
        _value = value;
      } else {
        _value = new DataSet(value);
      }
      this.set(key, _value);
      return value;
    } else {
      throw this._notExist(key);
    }
  }
  destroy(key: string): void {
    if (this.has(key)) {
      this.delete(key);
    } else {
      throw this._notExist(key);
    }
  }

  // utility functions
  rename<K extends string>(oldKey: string, newKey: K): K {
    if (this.has(oldKey)) {
      this.set(newKey, this.get(oldKey));
      this.delete(oldKey);
      return newKey;
    } else {
      throw this._notExist(oldKey);
    }
  }
  duplicate<K extends string>(key: string, newKey: K): K {
    if (this.has(key)) {
      this.set(newKey, this.get(key));
      return newKey;
    } else {
      throw this._notExist(key);
    }
  }
  merge(key: string, key2: string): void {
    if (this.has(key) && this.has(key2)) {
      const set = this.get(key).push(this.get(key2));
      this.set(key, set);
      return 
    } else {
      throw this._notExist(!this.has(key) ? key : key2);
    }
  }
  push(key: string, value: Value): void {
    if (this.has(key)) {
      this.get(key).push(value);
    } else {
      throw this._notExist(key);
    }
  }
  pop(key: string): void {
    if (this.has(key)) {
      this.get(key).pop();
    } else {
      throw this._notExist(key);
    }
  }
  sort(key: string, fn: (value: string, value2: string) => number): void {
    if (this.has(key)) {
      this.get(key).sort(key, fn);
    } else {
      throw this._notExist(key);
    }
  }
}