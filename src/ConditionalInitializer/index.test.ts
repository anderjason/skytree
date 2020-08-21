import { ManagedObject } from "../ManagedObject";
import { Test } from "../Test";
import { ConditionalInitializer } from ".";
import { Observable } from "../Observable";

Test.define("ConditionalInitializer can be created with a condition", () => {
  class TestObject extends ManagedObject {
    testValue: string;
  }

  const input = Observable.givenValue<string>("A");
  const expectedInstance = new TestObject();

  const initializer = ConditionalInitializer.givenDefinition({
    input,
    fn: (value: string) => {
      return value === "B";
    },
    instance: expectedInstance,
  });

  const handle = initializer.init();

  Test.assert(initializer.output.value == null);

  input.setValue("B");
  Test.assert(initializer.output.value === expectedInstance);

  input.setValue("C");
  Test.assert(initializer.output.value == null);

  input.setValue("B");
  Test.assert(initializer.output.value === expectedInstance);

  handle.release();
});
