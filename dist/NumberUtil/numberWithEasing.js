"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberWithEasing = void 0;
const numberWithHardLimit_1 = require("./numberWithHardLimit");
const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;
function bounceOut(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) {
        return n1 * x * x;
    }
    else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    }
    else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    }
    else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}
function numberWithEasing(input, type) {
    const x = numberWithHardLimit_1.numberWithHardLimit(input, 0, 1);
    switch (type) {
        case "linear":
            return x;
        case "inQuad":
            return x * x;
        case "outQuad":
            return 1 - (1 - x) * (1 - x);
        case "inOutQuad":
            return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
        case "inCubic":
            return x * x * x;
        case "outCubic":
            return 1 - pow(1 - x, 3);
        case "inOutCubic":
            return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
        case "inQuart":
            return x * x * x * x;
        case "outQuart":
            return 1 - pow(1 - x, 4);
        case "inOutQuart":
            return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
        case "inQuint":
            return x * x * x * x * x;
        case "outQuint":
            return 1 - pow(1 - x, 5);
        case "inOutQuint":
            return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
        case "inSine":
            return 1 - cos((x * PI) / 2);
        case "outSine":
            return sin((x * PI) / 2);
        case "inOutSine":
            return -(cos(PI * x) - 1) / 2;
        case "inExpo":
            return x === 0 ? 0 : pow(2, 10 * x - 10);
        case "outExpo":
            return x === 1 ? 1 : 1 - pow(2, -10 * x);
        case "inOutExpo":
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? pow(2, 20 * x - 10) / 2
                        : (2 - pow(2, -20 * x + 10)) / 2;
        case "inCirc":
            return 1 - sqrt(1 - pow(x, 2));
        case "outCirc":
            return sqrt(1 - pow(x - 1, 2));
        case "inOutCirc":
            return x < 0.5
                ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
                : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
        case "inBack":
            return c3 * x * x * x - c1 * x * x;
        case "outBack":
            return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
        case "inOutBack":
            return x < 0.5
                ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        case "inElastic":
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
        case "outElastic":
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
        case "inOutElastic":
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
                        : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
        case "inBounce":
            return 1 - bounceOut(1 - x);
        case "outBounce":
            return bounceOut(x);
        case "inOutBounce":
            return x < 0.5
                ? (1 - bounceOut(1 - 2 * x)) / 2
                : (1 + bounceOut(2 * x - 1)) / 2;
        default:
            throw new Error("Unsupported easing type");
    }
}
exports.numberWithEasing = numberWithEasing;
//# sourceMappingURL=numberWithEasing.js.map