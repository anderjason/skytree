"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instant = void 0;
class Instant {
    constructor(epochMilliseconds) {
        this._epochMilliseconds = epochMilliseconds;
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
    toEpochMilliseconds() {
        return this._epochMilliseconds;
    }
    toNativeDate() {
        return new Date(this._epochMilliseconds);
    }
    toString() {
        return this.toEpochMilliseconds().toString();
    }
    withAddedDuration(duration) {
        return new Instant(this._epochMilliseconds + duration.toMilliseconds());
    }
}
exports.Instant = Instant;
//# sourceMappingURL=index.js.map