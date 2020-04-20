"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Size3_1 = require("../Size3");
class MutableSize3 extends Size3_1.Size3 {
    static ofWidthHeightDepth(width, height, depth) {
        return new MutableSize3(width, height, depth);
    }
    static ofSize3(size) {
        return new MutableSize3(size.width, size.height, size.depth);
    }
    constructor(width, height, depth) {
        super(width, height, depth);
    }
    set width(value) {
        this._width = value;
    }
    set height(value) {
        this._height = value;
    }
    set depth(value) {
        this._depth = value;
    }
    toClone() {
        return new MutableSize3(this.width, this.height, this.depth);
    }
}
exports.MutableSize3 = MutableSize3;
//# sourceMappingURL=index.js.map