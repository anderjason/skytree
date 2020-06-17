import "mocha";
import * as assert from "assert";
import { Duration } from ".";
import { Instant } from "../Instant";

describe("Duration", () => {
  it("can be created from milliseconds", () => {
    const duration = Duration.givenMilliseconds(100);
    assert(duration.toMilliseconds() === 100);
  });

  it("can be created from seconds", () => {
    const duration = Duration.givenSeconds(10);
    assert(duration.toMilliseconds() === 10000);
  });

  it("can be created from minutes", () => {
    const duration = Duration.givenMinutes(1);
    assert(duration.toSeconds() === 60);
  });

  it("can be created from hours", () => {
    const duration = Duration.givenHours(1);
    assert(duration.toMinutes() === 60);
  });

  it("can be created from days", () => {
    const duration = Duration.givenDays(1);
    assert(duration.toHours() === 24);
  });

  it("can be created from the time between two instants", () => {
    const start = Instant.givenEpochMilliseconds(1586569320000);
    const end = Instant.givenEpochMilliseconds(1586569500000);

    const duration = Duration.givenInstantRange(start, end);
    assert(duration.toMinutes() === 3);
  });

  it("can be converted to milliseconds", () => {
    const duration = Duration.givenSeconds(0.5);
    assert(duration.toMilliseconds() === 500);
  });

  it("can be converted to seconds", () => {
    const duration = Duration.givenMilliseconds(500);
    assert(duration.toSeconds() === 0.5);
  });

  it("can be converted to minutes", () => {
    const duration = Duration.givenSeconds(30);
    assert(duration.toMinutes() === 0.5);
  });

  it("can be converted to hours", () => {
    const duration = Duration.givenMinutes(30);
    assert(duration.toHours() === 0.5);
  });

  it("can be converted to days", () => {
    const duration = Duration.givenMilliseconds(500);
    assert(duration.toSeconds() === 0.5);
  });

  it("can create a promise of a delay", async () => {
    const start = Instant.ofNow();

    const delayMs = 50;

    await Duration.givenMilliseconds(delayMs).toDelay();

    const end = Instant.ofNow();

    const elapsed = Duration.givenInstantRange(start, end);
    const deltaFromExpectedMs = Math.abs(delayMs - elapsed.toMilliseconds());

    assert(deltaFromExpectedMs < 5);
  });
});
