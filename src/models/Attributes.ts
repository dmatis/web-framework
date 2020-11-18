export class Attributes<T> {
  constructor(private data: T) {}

  // <K extends keyof T> - sets a Type Constraint on the type, K
  // the Type of K can ONLY be one of the keys of T
  // T[K] signals to TS what our return type will be
  // ie: if T is UserProps and K is id, return type can ONLY be number
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  }

  set = (update: T): void => {
    Object.assign(this.data, update);
  }

  getAll = (): T => {
    return this.data;
  }
}
