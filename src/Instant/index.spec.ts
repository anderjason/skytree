import "mocha";
import * as assert from "assert";
import { Instant } from ".";
import { Duration } from "../Duration";

describe("Instant", () => {
  it("can be created from the current time", () => {
    const nowMs = new Date().getTime();
    const instant = Instant.ofNow();

    const delta = Math.abs(instant.toEpochMilliseconds() - nowMs);
    assert(delta < 5);
  });

  it("can be created from an epoch milliseconds value", () => {
    const instant = Instant.givenEpochMilliseconds(1586569500000);
    assert(instant.toEpochMilliseconds() === 1586569500000);
  });

  it("can be converted to a native date", () => {
    const instant = Instant.givenEpochMilliseconds(1586484305000);
    const date = instant.toNativeDate();

    assert(date.toUTCString() === "Fri, 10 Apr 2020 02:05:05 GMT");
  });

  it("can be converted to a string", () => {
    const instant = Instant.givenEpochMilliseconds(1586569500000);
    assert(instant.toString() === "1586569500000");
  });

  it("can add a duration", () => {
    const instant = Instant.givenEpochMilliseconds(1586484305000);
    const result = instant.withAddedDuration(Duration.givenMinutes(3));
    const date = result.toNativeDate();

    assert(date.toUTCString() === "Fri, 10 Apr 2020 02:08:05 GMT");
  });
});
