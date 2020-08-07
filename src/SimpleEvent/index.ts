import { Handle } from "../Handle";
import { ArrayUtil } from "../ArrayUtil";
import { PromiseUtil } from "../PromiseUtil";

export type SimpleEventHandler<T> = (
  newValue: T,
  oldValue?: T
) => void | Promise<void>;

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

    return Handle.givenCallback(() => this.unsubscribe(handler));
  }

  emit = async (newValue: T): Promise<void> => {
    const previousValue = this._lastValue;
    this._lastValue = newValue;

    if (this._handlers != null) {
      await PromiseUtil.promiseOfSequentialActions(
        this._handlers,
        async (handler) => {
          await handler(newValue, previousValue);
        }
      );
    }
  };

  private unsubscribe(handler: SimpleEventHandler<T>): void {
    if (this._handlers == null) {
      return;
    }

    this._handlers = ArrayUtil.arrayWithoutValue(this._handlers, handler);

    if (this._handlers.length === 0) {
      this._handlers = undefined;
    }
  }
}
