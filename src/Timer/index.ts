import { ManagedObject } from "../ManagedObject";
import { Duration } from "@anderjason/time";
import { Receipt } from "@anderjason/observable";

export interface TimerProps {
  fn: () => void;
  duration: Duration;

  isRepeating?: boolean;
}

export class Timer extends ManagedObject<TimerProps> {
  private _timeout: any;

  onActivate() {
    if (this.props.isRepeating == true) {
      this._timeout = setInterval(() => {
        try {
          this.props.fn();
        } catch (err) {
          console.warn(err);
        }
      }, this.props.duration.toMilliseconds());

      this.cancelOnDeactivate(
        new Receipt(() => {
          if (this._timeout != null) {
            clearInterval(this._timeout);
            this._timeout = undefined;
          }
        })
      );
    } else {
      this._timeout = setTimeout(() => {
        try {
          this.props.fn();
        } catch (err) {
          console.warn(err);
        }
      }, this.props.duration.toMilliseconds());

      this.cancelOnDeactivate(
        new Receipt(() => {
          if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
          }
        })
      );
    }
  }
}
