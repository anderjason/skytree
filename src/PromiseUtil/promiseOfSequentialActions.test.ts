import { promiseOfSequentialActions } from "./promiseOfSequentialActions";
import { Test, assert } from "../Test";

Test.define(
  "promiseOfSequentialActions returns a promise that returns when all of the actions are completed",
  async () => {
    const values = [1, 2, 3];
    const result: number[] = [];

    await promiseOfSequentialActions(values, async (v) => {
      result.push(v * 2);
    });

    assert(result.join(",") === "2,4,6");
  }
);
