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

    // within 25ms of the expected time
    Test.assert(
      Math.abs(expectedActivateMs - activatedDuration.toMilliseconds()) < 25,
      "Activated within 25ms of expected time"
    );

    Test.assert(
      Math.abs(expectedDeactivateMs - deactivatedDuration.toMilliseconds()) < 25,
      "Deactivated within 25ms of expected time"
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

    Test.assert(actor.isActive == false, "Actor is not active");

    await Duration.givenMilliseconds(20).toDelay();
    Test.assert(actor.isActive == true, "Actor is active");

    await Duration.givenMilliseconds(100).toDelay();
    Test.assert(actor.isActive == true, "Actor is still active");

    delayInit.deactivate();
  }
);
