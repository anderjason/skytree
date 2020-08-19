export async function asyncSequenceGivenCountAndCallback(
  times: number,
  fn: (idx: number) => Promise<void>
): Promise<void> {
  if (times < 1) {
    return;
  }

  for (let index = 0; index < times; index++) {
    await fn(index);
  }
}
