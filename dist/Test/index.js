"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
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
function assertIsDeepEqual(actual, expected, failedMessage) {
    currentAssertionIndex += 1;
    if (!ObjectUtil_1.ObjectUtil.objectIsDeepEqual(actual, expected)) {
        throw new Error(failedMessage || `Assertion ${currentAssertionIndex} failed`);
    }
}
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
        await PromiseUtil_1.PromiseUtil.asyncSequenceGivenArrayAndCallback(Test._allTests, async (test) => {
            const unreleasedHandlesBefore = Handle_1.Handle.unreleasedSet.count;
            const managedObjectsBefore = ManagedObject_1.ManagedObject.initializedSet.count;
            await test.toPromise();
            const unreleasedHandlesAfter = Handle_1.Handle.unreleasedSet.count;
            const managedObjectsAfter = ManagedObject_1.ManagedObject.initializedSet.count;
            if (managedObjectsBefore !== managedObjectsAfter) {
                console.log(ManagedObject_1.ManagedObject.initializedSet
                    .toValues()
                    .map((o) => o.constructor.name));
                throw new Error(`Some managed objects are still initialized after test '${test.label}' (before ${managedObjectsBefore}, after ${managedObjectsAfter})`);
            }
            if (unreleasedHandlesBefore !== unreleasedHandlesAfter) {
                console.log(String(Handle_1.Handle.unreleasedSet.toValues()[0]._callback));
                throw new Error(`Some handles were not released after test '${test.label}' (before ${unreleasedHandlesBefore}, after ${unreleasedHandlesAfter})`);
            }
        });
    }
    async toPromise() {
        currentAssertionIndex = 0;
        console.log(this.label);
        const emptyObject = new ManagedObject_1.ManagedObject();
        emptyObject.init();
        await this._fn(emptyObject);
        emptyObject.uninit();
    }
}
exports.Test = Test;
Test._allTests = [];
Test.assert = assert;
Test.assertThrows = assertThrows;
Test.assertIsDeepEqual = assertIsDeepEqual;
//# sourceMappingURL=index.js.map