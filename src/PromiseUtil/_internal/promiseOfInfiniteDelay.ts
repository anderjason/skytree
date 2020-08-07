import { Duration } from "../../Duration";

export function promiseOfInfiniteDelay(): Promise<void> {
  // never resolves

  return new Promise(() => {
    // need to keep a setInterval in the event loop because
    // otherwise the process might eventually exit

    setInterval(Function.prototype, Duration.givenMinutes(10).toMilliseconds()); // do nothing every 10 minutes
  });
}
