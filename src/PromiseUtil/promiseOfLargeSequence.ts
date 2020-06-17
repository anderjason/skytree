import { promiseOfRepeatedActions } from "./promiseOfRepeatedActions";
import { Instant } from "../Instant";
import { Percent } from "../Percent";
import { Ratio } from "../Ratio";
import { Duration } from "../Duration";

export async function promiseOfLargeSequence(
  totalCount: number,
  groupSize: number,
  fn: (limit: number, offset: number) => Promise<void>
): Promise<void> {
  const times = Math.ceil(totalCount / groupSize);

  let processedRowCount = 0;

  console.log(`Processing ${totalCount} total items`);

  await promiseOfRepeatedActions(times, async (i) => {
    const startedAt = Instant.ofNow();

    let offset = i * groupSize;
    let limit = Math.min(groupSize, totalCount - offset);

    await fn(limit, offset);

    processedRowCount += limit;

    const percent = Percent.givenRatio(
      Ratio.givenFraction(
        processedRowCount,
        Math.max(processedRowCount, totalCount)
      )
    );

    const duration = Duration.givenInstantRange(startedAt, Instant.ofNow());
    const ms: number = Math.round(duration.toMilliseconds());

    console.log(
      `Processed ${processedRowCount} items in ${ms} ms (${percent.toString(
        1
      )})`
    );
  });
}
