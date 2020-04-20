"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Handle_1 = require("../Handle");
const arrayWithoutItem_1 = require("../ArrayUtil/arrayWithoutItem");
class SimpleEvent {
    constructor(lastEvent) {
        this._handlers = undefined;
        this._lastEvent = lastEvent;
    }
    static ofEmpty() {
        return new SimpleEvent();
    }
    static ofLastValue(lastEvent) {
        return new SimpleEvent(lastEvent);
    }
    subscribe(handler, includeLast = false) {
        if (this._handlers == null) {
            this._handlers = [];
        }
        this._handlers.push(handler);
        if (this._lastEvent != null && includeLast) {
            handler(this._lastEvent);
        }
        return Handle_1.Handle.ofFunction(() => this.unsubscribe(handler));
    }
    emit(event) {
        if (this._handlers != null) {
            this._handlers.forEach((handler) => {
                handler(event, this._lastEvent);
            });
        }
        this._lastEvent = event;
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