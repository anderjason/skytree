"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncLargeSequenceGivenDefinition = void 0;
const asyncSequenceGivenCountAndCallback_1 = require("./asyncSequenceGivenCountAndCallback");
const Instant_1 = require("../../Instant");
const Percent_1 = require("../../Percent");
const Duration_1 = require("../../Duration");
async function asyncLargeSequenceGivenDefinition(definition) {
    const { totalCount, groupSize, fn } = definition;
    const times = Math.ceil(totalCount / groupSize);
    let processedRowCount = 0;
    console.log(`Processing ${totalCount} total items`);
    await asyncSequenceGivenCountAndCallback_1.asyncSequenceGivenCountAndCallback(times, async (i) => {
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
exports.asyncLargeSequenceGivenDefinition = asyncLargeSequenceGivenDefinition;
//# sourceMappingURL=asyncLargeSequenceGivenDefinition.js.map