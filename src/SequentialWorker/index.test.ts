import { SequentialWorker } from ".";
import { Test } from "../Test";
import { Duration } from "../Duration";
import { PromiseUtil } from "../PromiseUtil";
import { ObjectUtil } from "../ObjectUtil";

Test.define("SequentialWorker can run jobs in sequence", async () => {
  const worker = SequentialWorker.ofEmpty();
  worker.init();

  const order: string[] = [];

  worker.addWork(async () => {
    order.push("A1");
    await PromiseUtil.asyncDelayGivenDuration(Duration.givenSeconds(0.1));
    order.push("A2");
  });

  worker.addWork(async () => {
    order.push("B1");
    await PromiseUtil.asyncDelayGivenDuration(Duration.givenSeconds(0.1));
    order.push("B2");
  });

  const jobC = worker.addWork(async () => {
    order.push("C1");
    await PromiseUtil.asyncDelayGivenDuration(Duration.givenSeconds(0.1));
    order.push("C2");
  });

  await new Promise((resolve, reject) => {
    const handle = jobC.state.didChange.subscribe((state) => {
      if (state === "finished") {
        handle.release();
        resolve();
      }
    });
  });

  Test.assert(
    ObjectUtil.objectIsDeepEqual(order, ["A1", "A2", "B1", "B2", "C1", "C2"])
  );

  worker.uninit();
});
