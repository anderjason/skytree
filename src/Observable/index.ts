import { SimpleEvent } from "../SimpleEvent";

export class Observable<T = number> {
  readonly didChange = SimpleEvent.ofEmpty<T>();

  static isObservable(input: any): input is Observable<unknown> {
    if (input == null) {
      return false;
    }

    if (typeof input !== "object") {
      return false;
    }

    return input._isObservable === true;
  }

  static ofValue<T>(value: T): Observable<T> {
    return new Observable<T>(value);
  }

  private _value: T;
  private _isObservable = true;

  private constructor(value: T) {
    this.setValue(value);
  }

  get value(): T {
    return this._value;
  }

  setValue(value: T): void {
    this._value = value;
    this.didChange.emit(value);
  }

  mutate = (fn: (value: T) => void): void => {
    fn(this.value);
    this.didChange.emit(this.value);
  };
}
