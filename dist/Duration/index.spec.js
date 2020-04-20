"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
const Instant_1 = require("../Instant");
describe("Duration", () => {
    it("can be created from milliseconds", () => {
        const duration = _1.Duration.ofMilliseconds(100);
        assert(duration.toMilliseconds() === 100);
    });
    it("can be created from seconds", () => {
        const duration = _1.Duration.ofSeconds(10);
        assert(duration.toMilliseconds() === 10000);
    });
    it("can be created from minutes", () => {
        const duration = _1.Duration.ofMinutes(1);
        assert(duration.toSeconds() === 60);
    });
    it("can be created from hours", () => {
        const duration = _1.Duration.ofHours(1);
        assert(duration.toMinutes() === 60);
    });
    it("can be created from days", () => {
        const duration = _1.Duration.ofDays(1);
        assert(duration.toHours() === 24);
    });
    it("can be created from the time between two instants", () => {
        const start = Instant_1.Instant.ofEpochMilliseconds(1586569320000);
        const end = Instant_1.Instant.ofEpochMilliseconds(1586569500000);
        const duration = _1.Duration.ofTimeBetweenInstants(start, end);
        assert(duration.toMinutes() === 3);
    });
    it("can be converted to milliseconds", () => {
        const duration = _1.Duration.ofSeconds(0.5);
        assert(duration.toMilliseconds() === 500);
    });
    it("can be converted to seconds", () => {
        const duration = _1.Duration.ofMilliseconds(500);
        assert(duration.toSeconds() === 0.5);
    });
    it("can be converted to minutes", () => {
        const duration = _1.Duration.ofSeconds(30);
        assert(duration.toMinutes() === 0.5);
    });
    it("can be converted to hours", () => {
        const duration = _1.Duration.ofMinutes(30);
        assert(duration.toHours() === 0.5);
    });
    it("can be converted to days", () => {
        const duration = _1.Duration.ofMilliseconds(500);
        assert(duration.toSeconds() === 0.5);
    });
    it("can create a promise of a delay", () => __awaiter(void 0, void 0, void 0, function* () {
        const start = Instant_1.Instant.ofNow();
        const delayMs = 50;
        yield _1.Duration.ofMilliseconds(delayMs).toDelay();
        const end = Instant_1.Instant.ofNow();
        const elapsed = _1.Duration.ofTimeBetweenInstants(start, end);
        const deltaFromExpectedMs = Math.abs(delayMs - elapsed.toMilliseconds());
        assert(deltaFromExpectedMs < 5);
    }));
});
//# sourceMappingURL=index.spec.js.map