export type Value<V = string> = V | V[] | Set<V> | DataSet<V>;

export class DataSet<V = string> extends Set<V> {
  push(value: Value<V>): DataSet<V> {
    let _value: DataSet<V>;
    if (value instanceof DataSet) {
      _value = value;
    } else if (Array.isArray(value) || value instanceof Set) {
      _value = new DataSet<V>(value);
    } else {
      _value = new DataSet<V>([value]);
    }
    for (const item of _value) {
      this.add(item);
    }
    return this;
  }

  pop(): DataSet<V> | null {
    if (this.size > 0) {
      const item = Array.from(this)[this.size - 1];
      this.delete(item);
      return this;
    } else {
      return null;
    }
  }

  map(fn: (value: V) => V): DataSet<V> {
    const newSet = new DataSet<V>();
    for (const item of this) {
      newSet.add(fn(item));
    }
    return newSet;
  }

  filter(fn: (value: V) => boolean): DataSet<V> {
    const newSet = new DataSet<V>();
    for (const item of this) {
      if (fn(item)) {
        newSet.add(item);
      }
    }
    return newSet;
  }

  sort(fn: (value: V, value2: V) => number): DataSet<V> {
    const newSet = new DataSet<V>();
    const sort = (arr: V[]): V[] => {
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

export class DataStore<V = string> extends Map<string, DataSet<V>> {
  _exist(key: string): Error {
    return new Error(`Key ${key} already exists`);
  }
  _notExist(key: string): Error {
    return new Error(`Key ${key} does not exist`);
  }
  _path: string;

  // core functions
  create(key: string, value: Value<V>): string {
    if (this.has(key)) {
      throw this._exist(key);
    } else {
      let _value: DataSet<V>;
      if (value instanceof DataSet) {
        _value = value;
      } else if (Array.isArray(value) || value instanceof Set) {
        _value = new DataSet(value);
      } else {
        _value = new DataSet([value]);
      }
      this.set(key, _value);
      return key;
    }
  }
  read(key: string): DataSet<V> | null {
    if (this.has(key)) {
      return this.get(key);
    } else {
      return null;
    }
  }
  update(key: string, value: Value<V>): DataSet<V> {
    if (this.has(key)) {
      let _value: DataSet<V>;
      if (value instanceof DataSet) {
        _value = value;
      } else if (Array.isArray(value) || value instanceof Set) {
        _value = new DataSet(value);
      } else {
        _value = new DataSet([value]);
      }
      this.set(key, _value);
      return _value;
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
  push(key: string, value: Value<V>): void {
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
  sort(key: string, fn: (value: V, value2: V) => number): DataSet<V> {
    if (this.has(key)) {
      this.get(key).sort(fn);
      return this.get(key);
    } else {
      throw this._notExist(key);
    }
  }

  // persistence functions
  // use(path: string): void {
  //   this._path = path;
  //   if (!fs.existsSync(path)) throw new Error(`Path ${path} does not exist`);
  //   if (!fs.lstatSync(path).isDirectory()) throw new Error(`Path ${path} is not a directory`);
  //   if (!fs.accessSync(path, fs.constants.W_OK)) throw new Error(`Path ${path} is not writable`);
  //   if (!fs.accessSync(path, fs.constants.R_OK)) throw new Error(`Path ${path} is not readable`);
  // }
}