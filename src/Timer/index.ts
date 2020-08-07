import { ManagedObject } from "../ManagedObject";
import { Duration } from "../Duration";
import { Handle } from "../Handle";

export interface TimerDefinition {
  fn: () => void;
  duration: Duration;
  isRepeating: boolean;
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
    this._isRepeating = definition.isRepeating;
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

      this.addHandle(
        Handle.givenCallback(() => {
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

      this.addHandle(
        Handle.givenCallback(() => {
          if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
          }
        })
      );
    }
  }
}
