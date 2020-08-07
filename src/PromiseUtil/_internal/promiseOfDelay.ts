import { Duration } from "../../Duration";

export function promiseOfDelay(duration: Duration): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, duration.toMilliseconds())
  );
}
