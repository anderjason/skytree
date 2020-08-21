import { ManagedObject } from "../ManagedObject";
import { Test } from "../Test";
import { ObservableArray } from "../ObservableArray";
import { ArrayInitializer } from ".";

Test.define("ArrayInitializer can be created", () => {
  class TestObject extends ManagedObject {
    testValue: string;
  }

  const input = ObservableArray.ofEmpty<string>();
  const arrayInitializer = ArrayInitializer.givenDefinition({
    input,
    fn: (value: string, index: number, currentObject?: TestObject) => {
      if (value === "skip this one") {
        return undefined;
      }

      if (currentObject == null) {
        // create an object if it doesn't exist for this value
        currentObject = new TestObject();
      }

      // set up the object for this value
      currentObject.testValue = value;

      return currentObject;
    },
  });

  const handle = arrayInitializer.init();

  input.addValue("hello");
  input.addValue("world");

  const objects = arrayInitializer.objects.toValues();
  Test.assert(objects.length === 2);
  Test.assert(objects[0].testValue === "hello");
  Test.assert(objects[1].testValue === "world");
  Test.assert(objects[0].isInitialized);
  Test.assert(objects[1].isInitialized);

  const originalFirstObject = objects[0];
  const originalSecondObject = objects[1];

  input.addValue("message", 0);

  const objects2 = arrayInitializer.objects.toValues();
  Test.assert(objects2.length === 3);
  Test.assert(objects2[0].testValue === "message");
  Test.assert(objects2[1].testValue === "hello");
  Test.assert(objects2[2].testValue === "world");
  Test.assert(objects2[0].isInitialized);
  Test.assert(objects2[1].isInitialized);
  Test.assert(objects2[2].isInitialized);
  Test.assert(objects2[0] === originalFirstObject);
  Test.assert(objects2[1] === originalSecondObject);

  input.removeAllWhere((str) => str === "hello");

  const objects3 = arrayInitializer.objects.toValues();
  Test.assert(objects3.length === 2);
  Test.assert(objects3[0].testValue === "message");
  Test.assert(objects3[1].testValue === "world");
  Test.assert(objects3[0].isInitialized);
  Test.assert(objects3[1].isInitialized);
  Test.assert(objects3[0] === originalFirstObject);
  Test.assert(objects3[1] === originalSecondObject);

  input.addValue("skip this one", 1);

  const objects4 = arrayInitializer.objects.toValues();
  Test.assert(objects4.length === 3, "Expected length 3 in objects4");
  Test.assert(
    objects4[0].testValue === "message",
    "Expected message in objects4"
  );
  Test.assert(objects4[1] == null, "Expected null in objects4");
  Test.assert(objects4[2].testValue === "world", "Expected world in objects4");
  Test.assert(objects4[0].isInitialized, "Expected 0 initialized in objects4");
  Test.assert(objects4[2].isInitialized, "Expected 2 initialized in objects4");
  Test.assert(objects4[0] === originalFirstObject);

  input.removeValueAtIndex(1);

  const objects5 = arrayInitializer.objects.toValues();
  Test.assert(objects5.length === 2);
  Test.assert(objects5[0].testValue === "message");
  Test.assert(objects5[1].testValue === "world");
  Test.assert(objects5[0].isInitialized);
  Test.assert(objects5[1].isInitialized);
  Test.assert(objects5[0] === originalFirstObject);

  handle.release();
});
