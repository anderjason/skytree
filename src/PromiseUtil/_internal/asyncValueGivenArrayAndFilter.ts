import { asyncSequenceGivenArrayAndCallback } from "./asyncSequenceGivenArrayAndCallback";

export async function asyncValueGivenArrayAndFilter<T>(
  input: T[],
  fn: (element: T) => Promise<boolean>
): Promise<T | undefined> {
  let result: T | undefined = undefined;

  await asyncSequenceGivenArrayAndCallback(input, (element) => {
    return fn(element).then((isMatch) => {
      if (isMatch == true && result == null) {
        result = element;
      }
    });
  });

  return result;
}
