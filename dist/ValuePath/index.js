"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValuePath = void 0;
class ValuePath {
    constructor(pathParts) {
        this._pathParts = pathParts;
    }
    static isEqual(a, b) {
        if (a == null && b == null) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        return a.isEqual(b);
    }
    static givenParts(pathParts = []) {
        if (pathParts == null) {
            return new ValuePath([]);
        }
        if (pathParts.some((part) => part == null)) {
            throw new Error("Path cannot contain null or undefined parts");
        }
        if (pathParts.some((part) => String(part).includes("."))) {
            throw new Error("Path parts cannot contain a period character");
        }
        return new ValuePath(pathParts);
    }
    static givenString(path = "") {
        if (path == null) {
            return new ValuePath([]);
        }
        return new ValuePath(path.split("."));
    }
    static ofEmpty() {
        return new ValuePath([]);
    }
    get isEmpty() {
        return this._pathParts.length === 0;
    }
    isEqual(other) {
        if (other == null) {
            return false;
        }
        return this.toString() === other.toString();
    }
    isAncestorOf(other) {
        if (other == null) {
            return false;
        }
        const thisString = this.toString();
        const otherString = other.toString();
        return (otherString.startsWith(thisString) &&
            otherString.length > thisString.length);
    }
    isEqualOrAncestorOf(other) {
        if (other == null) {
            return false;
        }
        const thisString = this.toString();
        const otherString = other.toString();
        return otherString.startsWith(thisString);
    }
    isDescendantOf(other) {
        if (other == null) {
            return false;
        }
        return other.isAncestorOf(this);
    }
    isEqualOrDescendantOf(other) {
        if (other == null) {
            return false;
        }
        const thisString = this.toString();
        const otherString = other.toString();
        return thisString.startsWith(otherString);
    }
    toParts() {
        return this._pathParts;
    }
    toString() {
        return this._pathParts.join(".");
    }
    toRelativePath(descendant) {
        if (descendant == null) {
            throw new Error("Descendant is required");
        }
        if (!descendant.isDescendantOf(this)) {
            throw new Error("Specified path is not a descendant of this VCC path");
        }
        return new ValuePath(descendant.toParts().slice(this.toParts().length));
    }
    withRelativeParts(pathParts = []) {
        if (pathParts == null) {
            throw new Error("Path parts are required");
        }
        return new ValuePath([...this._pathParts, ...pathParts]);
    }
    withRelativeString(pathString) {
        if (pathString == null) {
            throw new Error("Path string is required");
        }
        const parts = pathString.split(".");
        return new ValuePath([...this._pathParts, ...parts]);
    }
}
exports.ValuePath = ValuePath;
//# sourceMappingURL=index.js.map