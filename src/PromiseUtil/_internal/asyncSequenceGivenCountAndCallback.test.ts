import { asyncSequenceGivenArrayAndCallback } from "./asyncSequenceGivenArrayAndCallback";
import { Test } from "../../Test";

Test.define(
  "asyncSequenceGivenArrayAndCallback returns a promise that returns when all of the actions are completed",
  async () => {
    const values = [1, 2, 3];
    const result: number[] = [];

    await asyncSequenceGivenArrayAndCallback(values, async (v) => {
      result.push(v * 2);
    });

    Test.assert(result.join(",") === "2,4,6");
  }
);
