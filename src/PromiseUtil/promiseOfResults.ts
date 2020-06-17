import { promiseOfSequentialActions } from "./promiseOfSequentialActions";

export function promiseOfResults<T, R>(
  input: T[],
  fn: (element: T, idx: number) => Promise<R>
): Promise<R[]> {
  const result: R[] = [];

  return promiseOfSequentialActions(input, (element, idx) => {
    return fn(element, idx).then((elementResult) => {
      result.push(elementResult);
    });
  }).then(() => {
    return result;
  });
}
