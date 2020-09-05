import { Transformer } from ".";
import { Test } from "@anderjason/tests";
import { Observable } from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

Test.define(
  "Transformer returns the expected results with a callback returning a promise",
  async () => {
    const obj = new ManagedObject();
    obj.init();

    const delays = [300, 50, 200, 75];

    const input = Observable.ofEmpty<string>();
    const outputs: string[] = [];

    let i = 0;

    const async = obj.addManagedObject(
      Transformer.givenDefinition({
        input,
        fn: async (lower) => {
          if (lower == null) {
            return null;
          }

          const milliseconds = delays[i];
          i += 1;

          await delay(milliseconds);

          return lower.toUpperCase();
        },
      })
    );

    obj.addHandle(
      async.output.didChange.subscribe((upper) => {
        if (upper == null) {
          return null;
        }

        outputs.push(upper);
      }, true)
    );

    input.setValue("a");
    await delay(100);

    input.setValue("b");
    await delay(100);

    input.setValue("c");
    await delay(100);

    input.setValue("d");
    await delay(100);

    Test.assertIsDeepEqual(outputs, ["B", "D"]);
  }
);
