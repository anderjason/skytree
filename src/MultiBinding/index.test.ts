import { Observable, TypedEvent } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { MultiBinding } from ".";
import { Actor } from "../Actor";

Test.define(
  "MultiBinding invalidates whenever a provided observable changes",
  () => {
    const obj = new Actor({});
    obj.activate();

    const inputA1 = Observable.givenValue("a1", Observable.isStrictEqual);
    const inputA2 = Observable.givenValue("a2", Observable.isStrictEqual);

    const multiBinding = obj.addActor(
      new MultiBinding({
        inputs: [
          inputA1, inputA2
        ]
      })
    );

    let invalidateCount: number = 0;
    obj.cancelOnDeactivate(
      multiBinding.didInvalidate.subscribe(() => {
        invalidateCount += 1;
      })
    );

    Test.assert(invalidateCount == 0, "invalidateCount should be 0");

    inputA1.setValue("X");
    Test.assert(invalidateCount == 1, "invalidateCount should be 1");

    inputA2.setValue("X");
    Test.assert(invalidateCount == 2, "invalidateCount should be 2");

    inputA1.setValue("X");  // no change
    Test.assert(invalidateCount == 2, "invalidateCount should still be 2");

    inputA1.setValue("Z");  // no change
    Test.assert(invalidateCount == 3, "invalidateCount should be 3");

    obj.deactivate();
  }
);

Test.define(
  "MultiBinding invalidates whenever a provided event is emitted",
  () => {
    const obj = new Actor({});
    obj.activate();

    const event1 = new TypedEvent();
    const event2 = new TypedEvent();

    const multiBinding = obj.addActor(
      new MultiBinding({
        inputs: [
          event1, event2
        ]
      })
    );

    let invalidateCount: number = 0;
    obj.cancelOnDeactivate(
      multiBinding.didInvalidate.subscribe(() => {
        invalidateCount += 1;
      })
    );

    Test.assert(invalidateCount == 0, "invalidateCount should be 0");

    event1.emit();
    Test.assert(invalidateCount == 1, "invalidateCount should be 1");

    event2.emit();
    Test.assert(invalidateCount == 2, "invalidateCount should be 2");

    event1.emit();
    Test.assert(invalidateCount == 3, "invalidateCount should be 3");

    obj.deactivate();
  }
);

