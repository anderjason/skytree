import "mocha";
import * as assert from "assert";
import { SimpleEvent } from ".";

describe("SimpleEvent", () => {
  it("can be subscribed to", () => {
    const event = SimpleEvent.ofEmpty();

    const handle = event.subscribe(() => {});

    assert(handle != null);
    handle.release();
  });

  it("can take an initial value", () => {
    const event = SimpleEvent.givenLastValue(5);

    let result: number;

    const handle = event.subscribe((v) => {
      result = v;
    }, true);

    assert(result === 5);
    handle.release();
  });

  it("fires the event with a value when emit is called", () => {
    const event = SimpleEvent.ofEmpty<number>();

    let result: number;
    let eventCount: number = 0;

    const handle = event.subscribe((v) => {
      result = v;
      eventCount += 1;
    });

    event.emit(5);
    assert(result === 5);
    assert(eventCount === 1);

    event.emit(10);

    // @ts-ignore
    assert(result === 10);

    // @ts-ignore
    assert(eventCount === 2);

    handle.release();
  });

  it("stops firing the event when the handle is released", () => {
    const event = SimpleEvent.ofEmpty<number>();

    let eventCount: number = 0;

    const handle = event.subscribe((v) => {
      eventCount += 1;
    });

    assert(eventCount === 0);

    event.emit(5);

    // @ts-ignore
    assert(eventCount === 1);

    handle.release();

    event.emit(10);

    // @ts-ignore
    assert(eventCount === 1); // no change
  });

  it("fires the event for new subscriptions with the previous value if requested", () => {
    const event = SimpleEvent.ofEmpty<number>();

    let result: number;

    event.emit(5);
    assert(result == null);

    const handle = event.subscribe((v) => {
      result = v;
    }, true);

    assert(result === 5);

    handle.release();
  });
});
