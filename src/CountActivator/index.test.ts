import { Observable } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { CountActivator } from ".";
import { Actor } from "../Actor";

interface TestObjectProps {
  idx: number;
}

class TestObject extends Actor<TestObjectProps> {
}

Test.define("CountActivator returns the expected results", () => {
  const input = Observable.ofEmpty<number>();

  const activator = new CountActivator({
    input,
    fn: (index: number) => {
      return new TestObject({ idx: index });
    },
  });
  activator.activate();

  Test.assert(activator.output.count === 0, "count should be 0");

  input.setValue(3);
  Test.assert(activator.output.count === 3, "count should be 3");
  Test.assert(activator.output.toOptionalValueGivenIndex(0).props.idx === 0, "idx should be 0");
  Test.assert(activator.output.toOptionalValueGivenIndex(1).props.idx === 1, "idx should be 1");
  Test.assert(activator.output.toOptionalValueGivenIndex(2).props.idx === 2, "idx should be 2");

  input.setValue(1);
  Test.assert(activator.output.count === 1, "count should be 1");
  Test.assert(activator.output.toOptionalValueGivenIndex(0).props.idx === 0, "idx should be 0");

  input.setValue(0);
  Test.assert(activator.output.count === 0, "count should be 0");

  input.setValue(1);
  input.setValue(1);
  Test.assert(activator.output.count === 1, "count should be 1");
  Test.assert(activator.output.toOptionalValueGivenIndex(0).props.idx === 0, "idx should be 0");

  input.setValue(undefined);
  input.setValue(undefined);
  input.setValue(1);
  Test.assert(activator.output.count === 1, "count should be 1");
  Test.assert(activator.output.toOptionalValueGivenIndex(0).props.idx === 0, "idx should be 0");

  activator.deactivate();
});
