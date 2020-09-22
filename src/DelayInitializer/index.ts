import { Observable } from "@anderjason/observable";
import { Duration } from "@anderjason/time";
import { ConditionalInitializer } from "../ConditionalInitializer";
import { ManagedObject } from "../ManagedObject";
import { Timer } from "../Timer";

export interface DelayInitializerProps {
  activateAfter: Duration;
  instance: ManagedObject<any>;

  deactivateAfter?: Duration;
}

export class DelayInitializer extends ManagedObject<DelayInitializerProps> {
  onActivate() {
    const isInitialized = Observable.givenValue(false);

    this.addManagedObject(
      new Timer({
        duration: this.props.activateAfter,
        fn: () => {
          isInitialized.setValue(true);
        },
      })
    );

    if (this.props.deactivateAfter != null) {
      this.addManagedObject(
        new ConditionalInitializer({
          input: isInitialized,
          fn: (v) => v,
          instance: new Timer({
            duration: this.props.deactivateAfter,
            fn: () => {
              isInitialized.setValue(false);
            },
          }),
        })
      );
    }

    this.addManagedObject(
      new ConditionalInitializer({
        input: isInitialized,
        fn: (v) => v,
        instance: this.props.instance,
      })
    );
  }
}
