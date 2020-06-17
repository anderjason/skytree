export function numberArrayGivenRange(
  firstNumber: number,
  lastNumber: number
): number[] {
  const result: number[] = [];

  if (lastNumber === firstNumber) {
    return [firstNumber];
  }

  if (firstNumber < lastNumber) {
    for (let i = firstNumber; i < lastNumber + 1; i++) {
      result.push(i);
    }
  } else {
    for (let i = lastNumber; i > firstNumber - 1; i--) {
      result.push(i);
    }
  }

  return result;
}
