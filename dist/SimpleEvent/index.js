"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleEvent = void 0;
const Handle_1 = require("../Handle");
const arrayWithoutItem_1 = require("../ArrayUtil/arrayWithoutItem");
class SimpleEvent {
    constructor(lastValue) {
        this._handlers = undefined;
        this._lastValue = lastValue;
    }
    static ofEmpty() {
        return new SimpleEvent();
    }
    static givenLastValue(lastValue) {
        return new SimpleEvent(lastValue);
    }
    subscribe(handler, includeLast = false) {
        if (this._handlers == null) {
            this._handlers = [];
        }
        this._handlers.push(handler);
        if (includeLast) {
            handler(this._lastValue);
        }
        return Handle_1.Handle.givenReleaseFunction(() => this.unsubscribe(handler));
    }
    emit(event) {
        if (this._handlers != null) {
            this._handlers.forEach((handler) => {
                handler(event, this._lastValue);
            });
        }
        this._lastValue = event;
    }
    unsubscribe(handler) {
        if (this._handlers == null) {
            return;
        }
        this._handlers = arrayWithoutItem_1.arrayWithoutItem(this._handlers, handler);
        if (this._handlers.length === 0) {
            this._handlers = undefined;
        }
    }
}
exports.SimpleEvent = SimpleEvent;
//# sourceMappingURL=index.js.map