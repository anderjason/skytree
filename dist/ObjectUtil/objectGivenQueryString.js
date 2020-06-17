"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectGivenQueryString = void 0;
function objectGivenQueryString(queryString = window.location.search) {
    const result = {};
    const text = queryString.trim().replace(/^[?#&]/, "");
    if (text.length == 0) {
        return result;
    }
    const parts = text.split("&");
    parts.forEach((part) => {
        const partText = part.replace(/\+/g, " ");
        const splitPart = partText.split("=");
        const key = decodeURIComponent(splitPart[0]);
        let val = decodeURIComponent(splitPart[1]);
        try {
            val = atob(val);
            val = JSON.parse(val);
        }
        catch (_a) {
            // empty
        }
        result[key] = val;
    });
    return result;
}
exports.objectGivenQueryString = objectGivenQueryString;
//# sourceMappingURL=objectGivenQueryString.js.map