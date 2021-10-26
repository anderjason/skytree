import { ConvertBinding } from ".";
import { Test } from "@anderjason/tests";
import { Observable } from "@anderjason/observable";
import { Actor } from "../Actor";

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

Test.define(
  "ConvertBinding returns the expected results with a callback returning a promise",
  async () => {
    const obj = new Actor({});
    obj.activate();

    const delays = [300, 50, 200, 75];

    const input = Observable.ofEmpty<string>();
    const outputs: string[] = [];

    let i = 0;

    const async = obj.addActor(
      new ConvertBinding({
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

    obj.cancelOnDeactivate(
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

    Test.assertIsDeepEqual(outputs, ["B", "D"], "outputs should contain B and D");
  }
);
