import { Duration, ManagedObject, Handle } from "..";

export class ManagedInterval extends ManagedObject {
  static ofFunction(callback: Function, duration: Duration): ManagedInterval {
    return new ManagedInterval(callback, duration);
  }

  private _interval: any;
  private _duration: Duration;
  private _callback: Function;

  private constructor(callback: Function, duration: Duration) {
    super();

    this._callback = callback;
    this._duration = duration;
  }

  initManagedObject() {
    this._interval = setInterval(() => {
      try {
        this._callback();
      } catch (err) {
        console.warn(err);
      }
    }, this._duration.toMilliseconds());

    this.addHandle(
      Handle.ofFunction(() => {
        if (this._interval != null) {
          clearInterval(this._interval);
          this._interval = undefined;
        }
      })
    );
  }
}
