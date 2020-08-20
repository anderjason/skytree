"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instant = void 0;
const __1 = require("..");
class Instant {
    constructor(epochMilliseconds) {
        this._epochMilliseconds = epochMilliseconds;
    }
    static isEqual(a, b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        return a.isEqual(b);
    }
    static ofNow() {
        return new Instant(new Date().getTime());
    }
    static givenEpochMilliseconds(epochMilliseconds) {
        if (typeof epochMilliseconds === "string") {
            return new Instant(parseInt(epochMilliseconds));
        }
        else {
            return new Instant(epochMilliseconds);
        }
    }
    static givenPortableString(input, fallbackValue) {
        if (__1.StringUtil.stringIsEmpty(input)) {
            return fallbackValue;
        }
        try {
            const obj = JSON.parse(input);
            if (typeof obj !== "object") {
                return fallbackValue;
            }
            const { epochMs } = obj;
            if (epochMs == null) {
                return fallbackValue;
            }
            return new Instant(epochMs);
        }
        catch (err) {
            console.warn(err);
            return fallbackValue;
        }
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return this._epochMilliseconds === other._epochMilliseconds;
    }
    toEpochMilliseconds() {
        return this._epochMilliseconds;
    }
    toNativeDate() {
        return new Date(this._epochMilliseconds);
    }
    toString() {
        return this.toEpochMilliseconds().toString();
    }
    toPortableString() {
        const obj = {
            epochMs: this._epochMilliseconds,
        };
        return JSON.stringify(obj);
    }
    withAddedDuration(duration) {
        return new Instant(this._epochMilliseconds + duration.toMilliseconds());
    }
}
exports.Instant = Instant;
//# sourceMappingURL=index.js.map