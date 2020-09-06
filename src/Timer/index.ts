import { ManagedObject } from "../ManagedObject";
import { Duration } from "@anderjason/time";
import { Receipt } from "@anderjason/observable";

export interface TimerDefinition {
  fn: () => void;
  duration: Duration;

  isRepeating?: boolean;
}

export class Timer extends ManagedObject {
  static givenDefinition(definition: TimerDefinition): Timer {
    return new Timer(definition);
  }

  private _timeout: any;
  private _duration: Duration;
  private _fn: () => void;
  private _isRepeating: boolean;

  private constructor(definition: TimerDefinition) {
    super();

    this._fn = definition.fn;
    this._duration = definition.duration;
    this._isRepeating = definition.isRepeating || false;
  }

  initManagedObject() {
    if (this._isRepeating) {
      this._timeout = setInterval(() => {
        try {
          this._fn();
        } catch (err) {
          console.warn(err);
        }
      }, this._duration.toMilliseconds());

      this.addReceipt(
        Receipt.givenCancelFunction(() => {
          if (this._timeout != null) {
            clearInterval(this._timeout);
            this._timeout = undefined;
          }
        })
      );
    } else {
      this._timeout = setTimeout(() => {
        try {
          this._fn();
        } catch (err) {
          console.warn(err);
        }
      }, this._duration.toMilliseconds());

      this.addReceipt(
        Receipt.givenCancelFunction(() => {
          if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
          }
        })
      );
    }
  }
}
