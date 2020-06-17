import { ManagedObject } from "../ManagedObject";
import { Duration } from "../Duration";
import { Handle } from "../Handle";

export class ManagedTimeout extends ManagedObject {
  static givenCallback(callback: Function, duration: Duration): ManagedTimeout {
    return new ManagedTimeout(callback, duration);
  }

  private _timeout: any;
  private _duration: Duration;
  private _callback: Function;
  private _didFire: boolean = false;

  private constructor(callback: Function, duration: Duration) {
    super();

    this._callback = callback;
    this._duration = duration;
  }

  get didFire(): boolean {
    return this._didFire;
  }

  initManagedObject() {
    this._timeout = setTimeout(() => {
      try {
        this._didFire = true;
        this._callback();
      } catch (err) {
        console.warn(err);
      }
    }, this._duration.toMilliseconds());

    this.addHandle(
      Handle.givenReleaseFunction(() => {
        if (this._timeout != null) {
          clearTimeout(this._timeout);
          this._timeout = undefined;
        }
      })
    );
  }
}
