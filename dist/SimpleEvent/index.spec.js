"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
describe("SimpleEvent", () => {
    it("can be subscribed to", () => {
        const event = _1.SimpleEvent.ofEmpty();
        const handle = event.subscribe(() => { });
        assert(handle != null);
        handle.release();
    });
    it("can take an initial value", () => {
        const event = _1.SimpleEvent.givenLastValue(5);
        let result;
        const handle = event.subscribe((v) => {
            result = v;
        }, true);
        assert(result === 5);
        handle.release();
    });
    it("fires the event with a value when emit is called", () => {
        const event = _1.SimpleEvent.ofEmpty();
        let result;
        let eventCount = 0;
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
        const event = _1.SimpleEvent.ofEmpty();
        let eventCount = 0;
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
        const event = _1.SimpleEvent.ofEmpty();
        let result;
        event.emit(5);
        assert(result == null);
        const handle = event.subscribe((v) => {
            result = v;
        }, true);
        assert(result === 5);
        handle.release();
    });
});
//# sourceMappingURL=index.spec.js.map