import { Handle } from "../Handle";
import { arrayWithoutItem } from "../ArrayUtil/arrayWithoutItem";

export type SimpleEventHandler<T> = (newValue: T, oldValue?: T) => void;

export class SimpleEvent<T = void> {
  private _handlers: SimpleEventHandler<T>[] | undefined = undefined;
  private _lastValue?: T;

  static ofEmpty<T = void>(): SimpleEvent<T> {
    return new SimpleEvent<T>();
  }

  static givenLastValue<T>(lastValue: T): SimpleEvent<T> {
    return new SimpleEvent(lastValue);
  }

  private constructor(lastValue?: T) {
    this._lastValue = lastValue;
  }

  subscribe(
    handler: SimpleEventHandler<T>,
    includeLast: boolean = false
  ): Handle {
    if (this._handlers == null) {
      this._handlers = [];
    }

    this._handlers.push(handler);

    if (includeLast) {
      handler(this._lastValue);
    }

    return Handle.givenReleaseFunction(() => this.unsubscribe(handler));
  }

  emit(event: T): void {
    if (this._handlers != null) {
      this._handlers.forEach((handler) => {
        handler(event, this._lastValue);
      });
    }

    this._lastValue = event;
  }

  private unsubscribe(handler: SimpleEventHandler<T>): void {
    if (this._handlers == null) {
      return;
    }

    this._handlers = arrayWithoutItem(this._handlers, handler);

    if (this._handlers.length === 0) {
      this._handlers = undefined;
    }
  }
}
