"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
describe("Handle", () => {
    it("is not released by default", () => {
        const handle = _1.Handle.givenReleaseFunction(() => { });
        assert(!handle.isReleased);
    });
    it("is released after calling release", () => {
        const handle = _1.Handle.givenReleaseFunction(() => { });
        handle.release();
        assert(handle.isReleased);
    });
    it("invokes the release function when calling release", () => {
        let didRelease = false;
        const handle = _1.Handle.givenReleaseFunction(() => {
            didRelease = true;
        });
        handle.release();
        assert(didRelease === true);
    });
    it("only invokes the release function once", () => {
        let releaseCount = 0;
        const handle = _1.Handle.givenReleaseFunction(() => {
            releaseCount += 1;
        });
        handle.release();
        handle.release();
        handle.release();
        assert(releaseCount === 1);
    });
});
//# sourceMappingURL=index.spec.js.map