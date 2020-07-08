import { SimpleEvent } from "../SimpleEvent";

export interface ObservableSetChange<T> {
  type: "add" | "remove";
  value: T;
}

export class ObservableSet<T> {
  readonly didChange = SimpleEvent.ofEmpty<ObservableSetChange<T>>();

  static ofEmpty<T>(): ObservableSet<T> {
    return new ObservableSet(new Set());
  }

  static givenValues<T>(values: T[] | Set<T>): ObservableSet<T> {
    return new ObservableSet(new Set(values));
  }

  private _set: Set<T>;

  private constructor(values: Set<T>) {
    this._set = values;
  }

  addValue(value: T): boolean {
    if (this._set.has(value)) {
      return false;
    }

    this._set.add(value);
    this.didChange.emit({
      type: "add",
      value,
    });

    return true;
  }

  removeValue(value: T): boolean {
    if (!this._set.has(value)) {
      return false;
    }

    this._set.delete(value);
    this.didChange.emit({
      type: "remove",
      value,
    });

    return true;
  }

  clear(): void {
    const values = this.toValues();

    this._set.clear();

    values.forEach((value) => {
      this.didChange.emit({
        type: "remove",
        value,
      });
    });
  }

  hasValue(value: T): boolean {
    return this._set.has(value);
  }

  toValues(): T[] {
    return Array.from(this._set);
  }

  toCount(): number {
    return this._set.size;
  }
}
