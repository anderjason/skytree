import { Transformer } from ".";
import { Test } from "../Test";
import { Observable } from "../Observable";
import { PromiseUtil } from "../PromiseUtil";
import { Duration } from "../Duration";

Test.define(
  "Transformer returns the expected results with a callback returning a promise",
  async (obj) => {
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

          const delay = Duration.givenMilliseconds(delays[i]);
          i += 1;

          await PromiseUtil.asyncDelayGivenDuration(delay);

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
    await PromiseUtil.asyncDelayGivenDuration(Duration.givenMilliseconds(100));

    input.setValue("b");
    await PromiseUtil.asyncDelayGivenDuration(Duration.givenMilliseconds(100));

    input.setValue("c");
    await PromiseUtil.asyncDelayGivenDuration(Duration.givenMilliseconds(100));

    input.setValue("d");
    await PromiseUtil.asyncDelayGivenDuration(Duration.givenMilliseconds(100));

    Test.assertIsDeepEqual(outputs, ["B", "D"]);
  }
);
