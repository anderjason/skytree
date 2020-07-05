"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const stringWithEachMatchReplaced_1 = require("./stringWithEachMatchReplaced");
describe("stringWithEachMatchReplaced", () => {
    it("returns the expected results with a promise", () => {
        const before = [
            `const PromiseHelper_1 = req("../../../lib/PromiseHelper");`,
            `const StringHelper_1 = req("../../../lib/StringHelper");`,
            `const Registry_1 = req("../../../lib/Registry");`,
            `const startLocalContainer_1 = req("./_internal/startLocalContainer");`,
        ].join("\n");
        const regex = /req\("(.*?)"\)/;
        const expected = [
            `const PromiseHelper_1 = TEST("../../../LIB/PROMISEHELPER");`,
            `const StringHelper_1 = TEST("../../../LIB/STRINGHELPER");`,
            `const Registry_1 = TEST("../../../LIB/REGISTRY");`,
            `const startLocalContainer_1 = TEST("./_INTERNAL/STARTLOCALCONTAINER");`,
        ].join("\n");
        return stringWithEachMatchReplaced_1.stringWithEachMatchReplaced(before, regex, (match) => {
            return Promise.resolve(`TEST("${match[1].toUpperCase()}")`);
        }).then((actual) => {
            assert(actual === expected);
        });
    });
    it("returns the expected results with a sync value", () => {
        const before = [
            `const PromiseHelper_1 = req("../../../lib/PromiseHelper");`,
            `const StringHelper_1 = req("../../../lib/StringHelper");`,
            `const Registry_1 = req("../../../lib/Registry");`,
            `const startLocalContainer_1 = req("./_internal/startLocalContainer");`,
        ].join("\n");
        const regex = /req\("(.*?)"\)/;
        const expected = [
            `const PromiseHelper_1 = TEST("../../../LIB/PROMISEHELPER");`,
            `const StringHelper_1 = TEST("../../../LIB/STRINGHELPER");`,
            `const Registry_1 = TEST("../../../LIB/REGISTRY");`,
            `const startLocalContainer_1 = TEST("./_INTERNAL/STARTLOCALCONTAINER");`,
        ].join("\n");
        return stringWithEachMatchReplaced_1.stringWithEachMatchReplaced(before, regex, (match) => {
            return `TEST("${match[1].toUpperCase()}")`;
        }).then((actual) => {
            assert(actual === expected);
        });
    });
});
//# sourceMappingURL=stringWithEachMatchReplaced.spec.js.map