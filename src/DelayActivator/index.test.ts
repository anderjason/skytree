import { Receipt } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { Duration, Instant } from "@anderjason/time";
import { DelayActivator } from ".";
import { Actor } from "../Actor";

Test.define(
  "DelayActivator activates and deactivates after a delay",
  async () => {
    const startTime = Instant.ofNow();

    let activatedDuration: Duration;
    let deactivatedDuration: Duration;

    class TestClass extends Actor<void> {
      onActivate() {
        activatedDuration = Duration.givenInstantRange(
          startTime,
          Instant.ofNow()
        );

        this.cancelOnDeactivate(
          new Receipt(() => {
            deactivatedDuration = Duration.givenInstantRange(
              startTime,
              Instant.ofNow()
            );
          })
        );
      }
    }

    const expectedActivateMs = 100;
    const displayMs = 300;
    const expectedDeactivateMs = expectedActivateMs + displayMs;

    const delayInit = new DelayActivator({
      activateAfter: Duration.givenMilliseconds(expectedActivateMs),
      deactivateAfter: Duration.givenMilliseconds(displayMs),
      actor: new TestClass(),
    });
    delayInit.activate();

    await Duration.givenMilliseconds(expectedDeactivateMs + 10).toDelay();

    // within 5ms of the expected time
    Test.assert(
      Math.abs(expectedActivateMs - activatedDuration.toMilliseconds()) < 5
    );

    Test.assert(
      Math.abs(expectedDeactivateMs - deactivatedDuration.toMilliseconds()) < 5
    );

    delayInit.deactivate();
  }
);

Test.define(
  "DelayActivator does not deactivate if the duration is not specified",
  async () => {
    const actor = new Actor({});

    const delayInit = new DelayActivator({
      activateAfter: Duration.givenMilliseconds(10),
      actor,
    });
    delayInit.activate();

    Test.assert(actor.isActive.value == false);

    await Duration.givenMilliseconds(20).toDelay();
    Test.assert(actor.isActive.value == true);

    await Duration.givenMilliseconds(100).toDelay();
    Test.assert(actor.isActive.value == true);

    delayInit.deactivate();
  }
);
