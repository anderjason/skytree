export function promiseOfInfiniteDelay(): Promise<void> {
  // never resolves

  return new Promise(() => {
    // need to keep a setInterval in the event loop because
    // otherwise the process might eventually exit
    const wait = () => {
      setInterval(wait, 100000);
    };

    wait();
  });
}
