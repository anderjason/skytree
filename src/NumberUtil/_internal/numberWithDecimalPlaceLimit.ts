export function numberWithDecimalPlaceLimit(
  input: number,
  digitsAfterDecimalPoint = 1
): number {
  return parseFloat(input.toFixed(digitsAfterDecimalPoint));
}
