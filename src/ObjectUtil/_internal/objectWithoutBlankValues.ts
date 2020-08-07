export function objectWithoutBlankValues(input: any): any {
  const result: any = {};

  Object.keys(input).forEach((key) => {
    const value = input[key];
    if (value != null) {
      result[key] = value;
    }
  });

  return result;
}
