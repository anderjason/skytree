export function stringWithPaddedZeros(input: number, width: number) {
  let result = String(input);

  return result.length >= width
    ? result
    : new Array(width - result.length + 1).join("0") + result;
}
