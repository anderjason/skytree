import { ManagedObject } from "../ManagedObject";
import { Test } from "../Test";
import { BooleanInitializer } from ".";
import { Observable } from "../Observable";

Test.define("BooleanInitializer can be created with a condition", () => {
  class TestObject extends ManagedObject {
    testValue: string;
  }

  const input = Observable.givenValue<string>("A");
  const expectedInstance = new TestObject();

  const booleanInitializer = BooleanInitializer.givenCondition({
    input,
    isActive: (value: string) => {
      return value === "B";
    },
    instance: expectedInstance,
  });

  const handle = booleanInitializer.init();

  Test.assert(booleanInitializer.instance == null);

  input.setValue("B");
  Test.assert(booleanInitializer.instance === expectedInstance);

  input.setValue("C");
  Test.assert(booleanInitializer.instance == null);

  input.setValue("B");
  Test.assert(booleanInitializer.instance === expectedInstance);

  handle.release();
});
