import { SequentialWorker } from ".";
import { Test } from "@anderjason/tests";
import { ObjectUtil } from "@anderjason/util";

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

Test.define("SequentialWorker can run jobs in sequence", async () => {
  const worker = new SequentialWorker({});
  worker.activate();

  const order: string[] = [];

  worker.addWork(async () => {
    order.push("A1");
    await delay(100);
    order.push("A2");
  });

  worker.addWork(async () => {
    order.push("B1");
    await delay(100);
    order.push("B2");
  });

  const jobC = worker.addWork(async () => {
    order.push("C1");
    await delay(100);
    order.push("C2");
  });

  await new Promise((resolve, reject) => {
    const receipt = jobC.state.didChange.subscribe((state) => {
      if (state === "finished") {
        receipt.cancel();
        resolve();
      }
    });
  });

  Test.assert(
    ObjectUtil.objectIsDeepEqual(order, ["A1", "A2", "B1", "B2", "C1", "C2"])
  );

  worker.deactivate();
});
