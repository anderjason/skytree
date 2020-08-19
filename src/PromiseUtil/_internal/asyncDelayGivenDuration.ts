import { Duration } from "../../Duration";

export function asyncDelayGivenDuration(duration: Duration): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, duration.toMilliseconds())
  );
}
