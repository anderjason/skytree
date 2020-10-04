import { Observable } from "@anderjason/observable";
import { Duration } from "@anderjason/time";
import { ConditionalActivator } from "../ConditionalActivator";
import { Actor } from "../Actor";
import { Timer } from "../Timer";

export interface DelayActivatorProps {
  actor: Actor<any>;

  activateAfter?: Duration;
  deactivateAfter?: Duration;
}

export class DelayActivator extends Actor<DelayActivatorProps> {
  onActivate() {
    const shouldActivate = Observable.givenValue(false);

    if (this.props.activateAfter != null) {
      this.addActor(
        new Timer({
          duration: this.props.activateAfter,
          isRepeating: false,
          fn: () => {
            shouldActivate.setValue(true);
          },
        })
      );
    } else {
      shouldActivate.setValue(true);
    }

    if (this.props.deactivateAfter != null) {
      this.addActor(
        new ConditionalActivator({
          input: shouldActivate,
          fn: (v) => v,
          actor: new Timer({
            duration: this.props.deactivateAfter,
            isRepeating: false,
            fn: () => {
              shouldActivate.setValue(false);
            },
          }),
        })
      );
    }

    this.addActor(
      new ConditionalActivator({
        input: shouldActivate,
        fn: (v) => v,
        actor: this.props.actor,
      })
    );
  }
}
