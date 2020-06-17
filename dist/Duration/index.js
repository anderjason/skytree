"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duration = void 0;
class Duration {
    constructor(milliseconds) {
        this._milliseconds = milliseconds;
    }
    static givenMilliseconds(milliseconds) {
        return new Duration(milliseconds);
    }
    static givenSeconds(seconds) {
        return Duration.givenMilliseconds(seconds * 1000);
    }
    static givenMinutes(minutes) {
        return Duration.givenSeconds(minutes * 60);
    }
    static givenHours(hours) {
        return Duration.givenMinutes(hours * 60);
    }
    static givenDays(days) {
        return Duration.givenHours(days * 24);
    }
    static givenInstantRange(start, end) {
        return new Duration(end.toEpochMilliseconds() - start.toEpochMilliseconds());
    }
    toMilliseconds() {
        return this._milliseconds;
    }
    toSeconds() {
        return this._milliseconds / 1000;
    }
    toMinutes() {
        return this.toSeconds() / 60;
    }
    toHours() {
        return this.toMinutes() / 60;
    }
    toDays() {
        return this.toHours() / 24;
    }
    toDelay() {
        return new Promise((resolve) => setTimeout(resolve, this._milliseconds));
    }
}
exports.Duration = Duration;
//# sourceMappingURL=index.js.map