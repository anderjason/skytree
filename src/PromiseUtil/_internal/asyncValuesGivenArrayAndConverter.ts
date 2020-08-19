import { asyncSequenceGivenArrayAndCallback } from "./asyncSequenceGivenArrayAndCallback";

export function asyncValuesGivenArrayAndConverter<T, R>(
  input: T[],
  fn: (element: T, idx: number) => Promise<R>
): Promise<R[]> {
  const result: R[] = [];

  return asyncSequenceGivenArrayAndCallback(input, (element, idx) => {
    return fn(element, idx).then((elementResult) => {
      result.push(elementResult);
    });
  }).then(() => {
    return result;
  });
}
