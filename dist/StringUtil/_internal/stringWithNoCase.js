"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringWithNoCase = void 0;
const hasSpace = /\s/;
const hasSeparator = /(_|-|\.|:)/;
const hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;
const separatorSplitter = /[\W_]+(.|$)/g;
const camelSplitter = /(.)([A-Z]+)/g;
function unseparate(input) {
    return input.replace(separatorSplitter, (m, next) => {
        return next ? " " + next : "";
    });
}
function uncamelize(input) {
    return input.replace(camelSplitter, function (m, previous, uppers) {
        return previous + " " + uppers.toLowerCase().split("").join(" ");
    });
}
function stringWithNoCase(input) {
    if (input == null) {
        throw new Error("input is required");
    }
    if (hasSpace.test(input)) {
        return input.toLowerCase();
    }
    if (hasSeparator.test(input)) {
        return (unseparate(input) || input).toLowerCase();
    }
    if (hasCamel.test(input)) {
        return uncamelize(input).toLowerCase();
    }
    return input.toLowerCase();
}
exports.stringWithNoCase = stringWithNoCase;
//# sourceMappingURL=stringWithNoCase.js.map