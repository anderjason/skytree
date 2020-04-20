import { numberWithHardLimit } from "./numberWithHardLimit";

export function numberWithRangeMap(
  input: number,
  inputLow: number,
  inputHigh: number,
  outputLow: number,
  outputHigh: number
): number {
  const result: number =
    ((input - inputLow) * (outputHigh - outputLow)) / (inputHigh - inputLow) +
    outputLow;

  return numberWithHardLimit(
    result,
    Math.min(outputLow, outputHigh),
    Math.max(outputLow, outputHigh)
  );
}
