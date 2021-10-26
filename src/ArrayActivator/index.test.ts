import { Observable, ObservableArray } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { ArrayActivator } from ".";
import { Actor } from "../Actor";

class TestObject extends Actor {
  id?: number;
  testValue: string;
}

Test.define("ArrayActivator supports ObservableArray input", () => {
  const input = ObservableArray.ofEmpty<string>();
  const arrayActivator = new ArrayActivator({
    input,
    fn: (inputString: string, index: number, currentObject?: TestObject) => {
      if (inputString === "skip") {
        return undefined;
      }

      if (currentObject == null) {
        // create an object if it doesn't exist for this value
        currentObject = new TestObject({});
      }

      // set up the object for this value
      currentObject.testValue = inputString;

      return currentObject;
    },
  });
  arrayActivator.activate();

  input.addValue("red");
  input.addValue("orange");
  // input is ["red", "orange"]

  const objects = arrayActivator.output.toValues();
  Test.assert(objects.length === 2, "objects.length === 2");
  Test.assert(objects[0].testValue === "red", "objects[0].testValue === 'red'");
  Test.assert(objects[1].testValue === "orange", "objects[1].testValue === 'orange'");
  Test.assert(objects[0].isActive, "objects[0].isActive");
  Test.assert(objects[1].isActive, "objects[1].isActive");

  const originalFirstObject = objects[0];
  const originalSecondObject = objects[1];

  input.addValue("green", 0);
  // input is ["green", "red", "orange"]

  const objects2 = arrayActivator.output.toValues();
  Test.assert(objects2.length === 3, "objects2.length === 3");
  Test.assert(objects2[0].testValue === "green", "objects2[0].testValue === 'green'");
  Test.assert(objects2[1].testValue === "red", "objects2[1].testValue === 'red'");
  Test.assert(objects2[2].testValue === "orange", "objects2[2].testValue === 'orange'");
  Test.assert(objects2[0].isActive, "objects2[0].isActive");
  Test.assert(objects2[1].isActive, "objects2[1].isActive");
  Test.assert(objects2[2].isActive, "objects2[2].isActive");
  Test.assert(objects2[0] === originalFirstObject, "objects2[0] === originalFirstObject");
  Test.assert(objects2[1] === originalSecondObject, "objects2[1] === originalSecondObject");

  input.removeAllWhere((str) => str === "red");
  // input is ["green", "orange"]

  const objects3 = arrayActivator.output.toValues();
  Test.assert(objects3.length === 2, "objects3.length === 2");
  Test.assert(objects3[0].testValue === "green", "objects3[0].testValue === 'green'");
  Test.assert(objects3[1].testValue === "orange", "objects3[1].testValue === 'orange'");
  Test.assert(objects3[0].isActive, "objects3[0].isActive");
  Test.assert(objects3[1].isActive, "objects3[1].isActive");
  Test.assert(objects3[0] === originalFirstObject, "objects3[0] === originalFirstObject");
  Test.assert(objects3[1] === originalSecondObject, "objects3[1] === originalSecondObject");

  input.addValue("skip", 1);
  // input = ["green", "skip", "orange"]

  const objects4 = arrayActivator.output.toValues();
  Test.assert(objects4.length === 3, "Expected length 3 in objects4");
  Test.assert(objects4[0].testValue === "green", "Expected green in objects4");
  Test.assert(objects4[1] == null, "Expected null in objects4");
  Test.assert(
    objects4[2].testValue === "orange",
    "Expected orange in objects4"
  );
  Test.assert(objects4[0].isActive, "Expected 0 initialized in objects4");
  Test.assert(objects4[2].isActive, "Expected 2 initialized in objects4");
  Test.assert(objects4[0] === originalFirstObject, "Expected 0 === originalFirstObject");

  input.removeValueAtIndex(1);
  // input is ["green", "orange"]

  const objects5 = arrayActivator.output.toValues();
  Test.assert(objects5.length === 2, "Expected length 2 in objects5");
  Test.assert(objects5[0].testValue === "green", "Expected green in objects5");
  Test.assert(objects5[1].testValue === "orange", "Expected orange in objects5");
  Test.assert(objects5[0].isActive, "Expected 0 initialized in objects5");
  Test.assert(objects5[1].isActive, "Expected 1 initialized in objects5");
  Test.assert(objects5[0] === originalFirstObject, "Expected 0 === originalFirstObject");

  arrayActivator.deactivate();
});

Test.define("ArrayActivator supports plain array input", () => {
  const input = ["red", "orange"];
  const arrayActivator = new ArrayActivator({
    input,
    fn: (inputString: string, index: number, currentObject?: TestObject) => {
      if (inputString === "skip") {
        return undefined;
      }

      if (currentObject == null) {
        // create an object if it doesn't exist for this value
        currentObject = new TestObject({});
      }

      // set up the object for this value
      currentObject.testValue = inputString;

      return currentObject;
    },
  });
  arrayActivator.activate();

  const objects = arrayActivator.output.toValues();
  Test.assert(objects.length === 2, "objects.length === 2");
  Test.assert(objects[0].testValue === "red", "objects[0].testValue === 'red'");
  Test.assert(objects[1].testValue === "orange", "objects[1].testValue === 'orange'");
  Test.assert(objects[0].isActive, "objects[0].isActive");
  Test.assert(objects[1].isActive, "objects[1].isActive");

  arrayActivator.deactivate();
});

Test.define("ArrayActivator supports Observable<any[]> input", () => {
  const input = Observable.givenValue<string[]>(["red", "orange"]);

  let lastId = 0;
  const arrayActivator = new ArrayActivator({
    input,
    fn: (inputString: string, index: number, currentObject?: TestObject) => {
      if (inputString === "skip") {
        return undefined;
      }

      if (currentObject == null) {
        // create an object if it doesn't exist for this index
        currentObject = new TestObject({});
        currentObject.id = lastId;

        lastId += 1;
      }

      // set up the object for this value
      currentObject.testValue = inputString;

      return currentObject;
    },
  });
  arrayActivator.activate();

  const objects = arrayActivator.output.toValues();
  Test.assert(objects.length === 2, "objects.length === 2");
  Test.assert(objects[0].testValue === "red", "objects[0].testValue === 'red'");
  Test.assert(objects[0].id === 0, "objects[0].id === 0");
  Test.assert(objects[1].testValue === "orange", "objects[1].testValue === 'orange'");
  Test.assert(objects[1].id === 1, "objects[1].id === 1");
  Test.assert(objects[0].isActive, "objects[0].isActive");
  Test.assert(objects[1].isActive, "objects[1].isActive");

  input.setValue(["red", "blue"]);

  const objects2 = arrayActivator.output.toValues();
  Test.assert(objects2.length === 2, "objects2.length === 2");
  Test.assert(objects2[0].testValue === "red", "objects2[0].testValue === 'red'");
  Test.assert(objects2[0].id === 0, "objects2[0].id === 0");
  Test.assert(objects2[1].testValue === "blue", "objects2[1].testValue === 'blue'");
  Test.assert(objects2[1].id === 1, "objects2[1].id === 1");
  Test.assert(objects2[0].isActive, "objects2[0].isActive");
  Test.assert(objects2[1].isActive, "objects2[1].isActive");

  input.setValue(["green", "orange", "purple"]);
  
  const objects3 = arrayActivator.output.toValues();
  Test.assert(objects3.length === 3, "objects3.length === 3");
  Test.assert(objects3[0].testValue === "green", "objects3[0].testValue === 'green'");
  Test.assert(objects3[0].id === 0, "objects3[0].id === 0");
  Test.assert(objects3[1].testValue === "orange", "objects3[1].testValue === 'orange'");
  Test.assert(objects3[1].id === 1, "objects3[1].id === 1");
  Test.assert(objects3[2].testValue === "purple", "objects3[2].testValue === 'purple'");
  Test.assert(objects3[2].id === 2, "objects3[2].id === 2");
  Test.assert(objects3[0].isActive, "objects3[0].isActive");
  Test.assert(objects3[1].isActive, "objects3[1].isActive");
  Test.assert(objects3[2].isActive, "objects3[2].isActive");

  input.setValue(["orange"]);

  const objects4 = arrayActivator.output.toValues();
  Test.assert(objects4.length === 1, "objects4.length === 1");
  Test.assert(objects4[0].testValue === "orange", "objects4[0].testValue === 'orange'");
  Test.assert(objects4[0].id === 0, "objects4[0].id === 0");
  Test.assert(objects4[0].isActive, "objects4[0].isActive");

  arrayActivator.deactivate();
});
