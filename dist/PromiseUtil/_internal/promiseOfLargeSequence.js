"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseOfLargeSequence = void 0;
const promiseOfRepeatedActions_1 = require("./promiseOfRepeatedActions");
const Instant_1 = require("../../Instant");
const Percent_1 = require("../../Percent");
const Duration_1 = require("../../Duration");
async function promiseOfLargeSequence(totalCount, groupSize, fn) {
    const times = Math.ceil(totalCount / groupSize);
    let processedRowCount = 0;
    console.log(`Processing ${totalCount} total items`);
    await promiseOfRepeatedActions_1.promiseOfRepeatedActions(times, async (i) => {
        const startedAt = Instant_1.Instant.ofNow();
        let offset = i * groupSize;
        let limit = Math.min(groupSize, totalCount - offset);
        await fn(limit, offset);
        processedRowCount += limit;
        const percent = Percent_1.Percent.givenFraction(processedRowCount, Math.max(processedRowCount, totalCount));
        const duration = Duration_1.Duration.givenInstantRange(startedAt, Instant_1.Instant.ofNow());
        const ms = Math.round(duration.toMilliseconds());
        console.log(`Processed ${processedRowCount} items in ${ms} ms (${percent.toString(1)})`);
    });
}
exports.promiseOfLargeSequence = promiseOfLargeSequence;
//# sourceMappingURL=promiseOfLargeSequence.js.map