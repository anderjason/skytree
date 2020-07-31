"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableSet = void 0;
const SimpleEvent_1 = require("../SimpleEvent");
class ObservableSet {
    constructor(values) {
        this.didChange = SimpleEvent_1.SimpleEvent.ofEmpty();
        this._isObservableSet = true;
        this._set = values;
    }
    static ofEmpty() {
        return new ObservableSet(new Set());
    }
    static givenValues(values) {
        return new ObservableSet(new Set(values));
    }
    static isObservableSet(input) {
        if (input == null) {
            return false;
        }
        if (typeof input !== "object") {
            return false;
        }
        return input._isObservableSet === true;
    }
    addValue(value) {
        if (this._set.has(value)) {
            return false;
        }
        this._set.add(value);
        this.didChange.emit({
            type: "add",
            value,
        });
        return true;
    }
    removeValue(value) {
        if (!this._set.has(value)) {
            return false;
        }
        this._set.delete(value);
        this.didChange.emit({
            type: "remove",
            value,
        });
        return true;
    }
    clear() {
        const values = this.toValues();
        this._set.clear();
        values.forEach((value) => {
            this.didChange.emit({
                type: "remove",
                value,
            });
        });
    }
    hasValue(value) {
        return this._set.has(value);
    }
    toValues() {
        return Array.from(this._set);
    }
    toCount() {
        return this._set.size;
    }
}
exports.ObservableSet = ObservableSet;
//# sourceMappingURL=index.js.map