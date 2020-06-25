"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
describe("Size3", () => {
    it("can be adjusted to fit a larger bounding box", () => {
        const original = _1.Size3.givenWidthHeightDepth(100, 200, 150);
        const bounds = _1.Size3.givenWidthHeightDepth(1000, 1000, 1000);
        const actual = original.withAvailableSize(bounds, "flexible");
        const expected = _1.Size3.givenWidthHeightDepth(500, 1000, 750);
        assert(actual.isEqual(expected));
    });
    it("can be adjusted to fit a smaller bounding box", () => {
        const original = _1.Size3.givenWidthHeightDepth(100, 200, 150);
        const bounds = _1.Size3.givenWidthHeightDepth(10, 10, 10);
        const actual = original.withAvailableSize(bounds, "flexible");
        const expected = _1.Size3.givenWidthHeightDepth(5, 10, 7.5);
        assert(actual.isEqual(expected));
    });
    it("can be adjusted to fit a larger bounding box without expanding", () => {
        const original = _1.Size3.givenWidthHeightDepth(100, 200, 150);
        const bounds = _1.Size3.givenWidthHeightDepth(1000, 1000, 1000);
        const actual = original.withAvailableSize(bounds, "shrink");
        const expected = _1.Size3.givenWidthHeightDepth(100, 200, 150);
        assert(actual.isEqual(expected));
    });
    it("can be adjusted to fit a zero size bounding box", () => {
        const original = _1.Size3.givenWidthHeightDepth(100, 200, 150);
        const bounds = _1.Size3.givenWidthHeightDepth(0, 0, 0);
        const actual = original.withAvailableSize(bounds, "flexible");
        const expected = _1.Size3.ofZero();
        assert(actual.isEqual(expected));
    });
});
//# sourceMappingURL=index.spec.js.map