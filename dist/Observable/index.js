"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleEvent_1 = require("../SimpleEvent");
class Observable {
    constructor(value) {
        this.didChange = SimpleEvent_1.SimpleEvent.ofEmpty();
        this._isObservable = true;
        this.mutate = (fn) => {
            fn(this.value);
            this.didChange.emit(this.value);
        };
        this.setValue(value);
    }
    static isObservable(input) {
        if (input == null) {
            return false;
        }
        if (typeof input !== "object") {
            return false;
        }
        return input._isObservable === true;
    }
    static ofValue(value) {
        return new Observable(value);
    }
    get value() {
        return this._value;
    }
    setValue(value) {
        this._value = value;
        this.didChange.emit(value);
    }
}
exports.Observable = Observable;
//# sourceMappingURL=index.js.map