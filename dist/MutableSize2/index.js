"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Size2_1 = require("../Size2");
class MutableSize2 extends Size2_1.Size2 {
    static ofWidthHeight(width, height) {
        return new MutableSize2(width, height);
    }
    static ofSize2(size) {
        return new MutableSize2(size.width, size.height);
    }
    static ofZero() {
        return new MutableSize2(0, 0);
    }
    constructor(width, height) {
        super(width, height);
    }
    set width(value) {
        this._width = value;
    }
    set height(value) {
        this._height = value;
    }
    toClone() {
        return new MutableSize2(this.width, this.height);
    }
}
exports.MutableSize2 = MutableSize2;
//# sourceMappingURL=index.js.map