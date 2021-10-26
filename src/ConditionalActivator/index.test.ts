import { Observable } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { ConditionalActivator } from ".";
import { Actor } from "../Actor";

Test.define("ConditionalActivator can be created with a condition", () => {
  class TestObject extends Actor {
    testValue: string;
  }

  const input = Observable.givenValue<string>("A");
  const expectedInstance = new TestObject({});

  const initializer = new ConditionalActivator({
    input,
    fn: (value: string) => {
      return value === "B";
    },
    actor: expectedInstance,
  });

  const receipt = initializer.activate();

  Test.assert(initializer.output.value == null, "output is null");

  input.setValue("B");
  Test.assert(initializer.output.value === expectedInstance, "output is set");

  input.setValue("C");
  Test.assert(initializer.output.value == null, "output is null");

  input.setValue("B");
  Test.assert(initializer.output.value === expectedInstance, "output is set");

  receipt.cancel();
});
