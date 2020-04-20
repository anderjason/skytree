import { Duration } from "../Duration";

interface RateLimitedFunctionDefinition<T> {
  fn: (args?: T) => Promise<void>;
  waitDuration: Duration;
  leading: boolean;
  trailing: boolean;
}

export class RateLimitedFunction<T> {
  private _count: number = 0;
  private _timeout: any = null;
  private _lastArgs?: T;
  private _fn: (args?: T) => Promise<void>;
  private _waitDuration: Duration;
  private _leading: boolean;
  private _trailing: boolean;
  private _isRunning: boolean;
  private _wasInvokedWhileRunning: boolean;

  static ofDefinition<T>(
    definition: RateLimitedFunctionDefinition<T>
  ): RateLimitedFunction<T> {
    return new RateLimitedFunction(definition);
  }

  private constructor(definition: RateLimitedFunctionDefinition<T>) {
    if (definition.leading == false && definition.trailing == false) {
      throw new Error(
        "Expected at least one of leading or trailing to be true"
      );
    }

    this._fn = definition.fn;
    this._waitDuration = definition.waitDuration;
    this._leading = definition.leading;
    this._trailing = definition.trailing;
    this._isRunning = false;
    this._wasInvokedWhileRunning = false;
  }

  invoke = (args?: T) => {
    this._count += 1;
    this._lastArgs = args;

    if (this._isRunning) {
      this._wasInvokedWhileRunning = true;
      return;
    }

    const invokeNow = () => {
      this._isRunning = true;
      this._lastArgs = undefined;

      const onFinishedRunning = () => {
        const wasInvoked = this._wasInvokedWhileRunning;

        this._count = 0;
        this._isRunning = false;
        this._wasInvokedWhileRunning = false;

        if (wasInvoked) {
          this.invoke(this._lastArgs);
        }
      };

      try {
        this._fn(args)
          .then(() => {
            onFinishedRunning();
          })
          .catch((err) => {
            console.error(err);
            onFinishedRunning();
          });
      } catch (err) {
        console.error(err);
        onFinishedRunning();
      }
    };

    if (this._count === 1 && this._leading) {
      invokeNow();
    }

    const finishedWaiting = () => {
      if (this._trailing) {
        if (!this._leading || this._count > 1) {
          invokeNow();
          return;
        }
      }

      this._count = 0;
    };

    if (this._timeout != null) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(
      finishedWaiting,
      this._waitDuration.toMilliseconds()
    );
  };

  clear = () => {
    if (this._timeout != null) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  };
}
