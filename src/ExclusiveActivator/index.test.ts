import { Observable, TypedEvent } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { ExclusiveActivator } from ".";

Test.define("ExclusiveActivator can be created with an observable", () => {
  const input = Observable.givenValue<string>("A");

  const receivedNewStrings: string[] = [];
  const receivedOldStrings: string[] = [];

  const obj = new ExclusiveActivator({
    input,
    fn: (newString, oldString) => {
      receivedNewStrings.push(newString);
      receivedOldStrings.push(oldString);

      return undefined;
    },
  });
  obj.activate();

  input.setValue("B");
  input.setValue("C");

  Test.assertIsDeepEqual(receivedNewStrings, ["A", "B", "C"]);
  Test.assertIsDeepEqual(receivedOldStrings, [undefined, "A", "B"]);

  obj.deactivate();
});

Test.define("ExclusiveActivator can be created with a typed event", () => {
  const input = new TypedEvent<string>();

  const receivedNewStrings: string[] = [];
  const receivedOldStrings: string[] = [];

  const obj = new ExclusiveActivator({
    input,
    fn: (newString, oldString) => {
      receivedNewStrings.push(newString);
      receivedOldStrings.push(oldString);

      return undefined;
    },
  });
  obj.activate();

  input.emit("A");
  input.emit("B");
  input.emit("C");

  Test.assertIsDeepEqual(receivedNewStrings, ["A", "B", "C"]);
  Test.assertIsDeepEqual(receivedOldStrings, [undefined, "A", "B"]);

  obj.deactivate();
});
