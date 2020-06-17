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
exports.promiseOfLargeSequence = void 0;
const promiseOfRepeatedActions_1 = require("./promiseOfRepeatedActions");
const Instant_1 = require("../Instant");
const Percent_1 = require("../Percent");
const Ratio_1 = require("../Ratio");
const Duration_1 = require("../Duration");
function promiseOfLargeSequence(totalCount, groupSize, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        const times = Math.ceil(totalCount / groupSize);
        let processedRowCount = 0;
        console.log(`Processing ${totalCount} total items`);
        yield promiseOfRepeatedActions_1.promiseOfRepeatedActions(times, (i) => __awaiter(this, void 0, void 0, function* () {
            const startedAt = Instant_1.Instant.ofNow();
            let offset = i * groupSize;
            let limit = Math.min(groupSize, totalCount - offset);
            yield fn(limit, offset);
            processedRowCount += limit;
            const percent = Percent_1.Percent.givenRatio(Ratio_1.Ratio.givenFraction(processedRowCount, Math.max(processedRowCount, totalCount)));
            const duration = Duration_1.Duration.givenInstantRange(startedAt, Instant_1.Instant.ofNow());
            const ms = Math.round(duration.toMilliseconds());
            console.log(`Processed ${processedRowCount} items in ${ms} ms (${percent.toString(1)})`);
        }));
    });
}
exports.promiseOfLargeSequence = promiseOfLargeSequence;
//# sourceMappingURL=promiseOfLargeSequence.js.map