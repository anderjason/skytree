"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Duration {
    constructor(milliseconds) {
        this._milliseconds = milliseconds;
    }
    static ofMilliseconds(milliseconds) {
        return new Duration(milliseconds);
    }
    static ofSeconds(seconds) {
        return Duration.ofMilliseconds(seconds * 1000);
    }
    static ofMinutes(minutes) {
        return Duration.ofSeconds(minutes * 60);
    }
    static ofHours(hours) {
        return Duration.ofMinutes(hours * 60);
    }
    static ofDays(days) {
        return Duration.ofHours(days * 24);
    }
    static ofTimeBetweenInstants(start, end) {
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