"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryStringGivenObject = void 0;
function queryStringGivenObject(input) {
    if (input == null) {
        return "";
    }
    const pairs = [];
    Object.keys(input).forEach((key) => {
        let value = input[key];
        if (typeof value === "object") {
            if (Object.keys(value).length > 0) {
                value = JSON.stringify(value);
                value = btoa(value);
            }
            else {
                value = undefined;
            }
        }
        if (value != null) {
            value = encodeURIComponent(value);
            pairs.push(`${key}=${value}`);
        }
    });
    if (pairs.length === 0) {
        return "";
    }
    return `?${pairs.join("&")}`;
}
exports.queryStringGivenObject = queryStringGivenObject;
//# sourceMappingURL=queryStringGivenObject.js.map