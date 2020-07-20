"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = exports.assertThrows = exports.assert = void 0;
const PromiseUtil_1 = require("../PromiseUtil");
let currentAssertionIndex = 0;
function assert(value, failedMessage) {
    currentAssertionIndex += 1;
    if (!value) {
        throw new Error(failedMessage || `Assertion ${currentAssertionIndex} failed`);
    }
}
exports.assert = assert;
async function assertThrows(fn, failedMessage) {
    currentAssertionIndex += 1;
    try {
        await fn();
        // fn is expected to throw, so if we get here, it's an error
        throw new Error(failedMessage || `Assertion ${currentAssertionIndex} failed`);
    }
    catch (_a) {
        // OK
    }
}
exports.assertThrows = assertThrows;
class Test {
    constructor(label, fn) {
        this._label = label;
        this._fn = fn;
    }
    static define(label, fn) {
        if (label == null) {
            throw new Error("label is required");
        }
        if (fn == null) {
            throw new Error("fn is required");
        }
        Test._allTests.push(new Test(label, fn));
    }
    static async runAll() {
        await PromiseUtil_1.PromiseUtil.promiseOfSequentialActions(Test._allTests, async (test) => {
            await test.toPromise();
        });
    }
    async toPromise() {
        currentAssertionIndex = 0;
        console.log(this._label);
        await this._fn();
    }
}
exports.Test = Test;
Test._allTests = [];
Test.assert = assert;
Test.assertThrows = assertThrows;
//# sourceMappingURL=index.js.map