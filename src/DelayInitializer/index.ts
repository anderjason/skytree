import { Observable } from "@anderjason/observable";
import { Duration } from "@anderjason/time";
import { ConditionalInitializer } from "../ConditionalInitializer";
import { ManagedObject } from "../ManagedObject";
import { Timer } from "../Timer";

export interface DelayInitializerProps {
  instance: ManagedObject<any>;

  activateAfter?: Duration;
  deactivateAfter?: Duration;
}

export class DelayInitializer extends ManagedObject<DelayInitializerProps> {
  onActivate() {
    const shouldActivate = Observable.givenValue(false);

    if (this.props.activateAfter != null) {
      this.addManagedObject(
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
      this.addManagedObject(
        new ConditionalInitializer({
          input: shouldActivate,
          fn: (v) => v,
          instance: new Timer({
            duration: this.props.deactivateAfter,
            isRepeating: false,
            fn: () => {
              shouldActivate.setValue(false);
            },
          }),
        })
      );
    }

    this.addManagedObject(
      new ConditionalInitializer({
        input: shouldActivate,
        fn: (v) => v,
        instance: this.props.instance,
      })
    );
  }
}
