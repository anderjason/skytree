import { Handle } from "../Handle";
import { arrayWithoutItem } from "../ArrayUtil/arrayWithoutItem";

export type SimpleEventHandler<T> = (newValue: T, oldValue?: T) => void;

export class SimpleEvent<T = void> {
  private _handlers: SimpleEventHandler<T>[] | undefined = undefined;
  private _lastEvent?: T;

  static ofEmpty<T = void>(): SimpleEvent<T> {
    return new SimpleEvent<T>();
  }

  static ofLastValue<T>(lastEvent: T): SimpleEvent<T> {
    return new SimpleEvent(lastEvent);
  }

  private constructor(lastEvent?: T) {
    this._lastEvent = lastEvent;
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
      handler(this._lastEvent);
    }

    return Handle.ofFunction(() => this.unsubscribe(handler));
  }

  emit(event: T): void {
    if (this._handlers != null) {
      this._handlers.forEach((handler) => {
        handler(event, this._lastEvent);
      });
    }

    this._lastEvent = event;
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
