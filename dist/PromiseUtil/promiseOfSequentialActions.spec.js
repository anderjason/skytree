"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const promiseOfSequentialActions_1 = require("./promiseOfSequentialActions");
describe("promiseOfSequentialActions", () => {
    it("returns a promise that returns when all of the actions are completed", () => __awaiter(void 0, void 0, void 0, function* () {
        const values = [1, 2, 3];
        const result = [];
        yield promiseOfSequentialActions_1.promiseOfSequentialActions(values, (v) => __awaiter(void 0, void 0, void 0, function* () {
            result.push(v * 2);
        }));
        assert(result.join(",") === "2,4,6");
    }));
});
//# sourceMappingURL=promiseOfSequentialActions.spec.js.map