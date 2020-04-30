import { SimpleEvent } from "../SimpleEvent";

export type ObservableFilter<T> = (input: T) => boolean;

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

  static ofValue<T>(value: T, filter?: ObservableFilter<T>): Observable<T> {
    return new Observable<T>(value, filter);
  }

  private _value: T;
  private _isObservable = true;
  private _filter: ObservableFilter<T> | undefined;

  private constructor(value: T, filter?: ObservableFilter<T>) {
    this._filter = filter;
    this.setValue(value);
  }

  get value(): T {
    return this._value;
  }

  setValue(value: T): void {
    let allowUpdate: boolean;

    if (this._filter != null) {
      try {
        allowUpdate = this._filter(value);
      } catch (err) {
        console.warn(err);
        allowUpdate = false;
      }
    } else {
      allowUpdate = true;
    }

    if (!allowUpdate) {
      return;
    }

    this._value = value;
    this.didChange.emit(value);
  }

  mutate = (fn: (value: T) => void): void => {
    fn(this.value);
    this.didChange.emit(this.value);
  };
}
