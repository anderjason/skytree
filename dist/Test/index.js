"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = exports.assertThrows = exports.assertIsEqual = exports.assert = void 0;
const PromiseUtil_1 = require("../PromiseUtil");
const ObjectUtil_1 = require("../ObjectUtil");
const Handle_1 = require("../Handle");
const ManagedObject_1 = require("../ManagedObject");
let currentAssertionIndex = 0;
function assert(value, failedMessage) {
    currentAssertionIndex += 1;
    if (!value) {
        throw new Error(failedMessage || `Assertion ${currentAssertionIndex} failed`);
    }
}
exports.assert = assert;
function assertIsEqual(actual, expected, failedMessage) {
    currentAssertionIndex += 1;
    if (!ObjectUtil_1.ObjectUtil.objectIsDeepEqual(actual, expected)) {
        throw new Error(failedMessage || `Assertion ${currentAssertionIndex} failed`);
    }
}
exports.assertIsEqual = assertIsEqual;
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
        this.label = label;
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
            const unreleasedHandlesBefore = Handle_1.Handle.unreleasedCount.value;
            const managedObjectsBefore = ManagedObject_1.ManagedObject.initializedCount.value;
            await test.toPromise();
            const unreleasedHandlesAfter = Handle_1.Handle.unreleasedCount.value;
            const managedObjectsAfter = ManagedObject_1.ManagedObject.initializedCount.value;
            if (managedObjectsBefore !== managedObjectsAfter) {
                throw new Error(`Some managed objects are still initialized after test '${test.label}' (before ${managedObjectsBefore}, after ${managedObjectsAfter})`);
            }
            if (unreleasedHandlesBefore !== unreleasedHandlesAfter) {
                throw new Error(`Some handles were not released after test '${test.label}' (before ${unreleasedHandlesBefore}, after ${unreleasedHandlesAfter})`);
            }
        });
    }
    async toPromise() {
        currentAssertionIndex = 0;
        console.log(this.label);
        await this._fn();
    }
}
exports.Test = Test;
Test._allTests = [];
Test.assert = assert;
Test.assertThrows = assertThrows;
Test.assertIsEqual = assertIsEqual;
//# sourceMappingURL=index.js.map