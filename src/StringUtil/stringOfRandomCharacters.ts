const defaultCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function stringOfRandomCharacters(
  length: number,
  chars: string = defaultCharacters
): string {
  const result = [];

  const charactersLength = chars.length;

  for (let i = 0; i < length; i++) {
    result.push(chars.charAt(Math.floor(Math.random() * charactersLength)));
  }

  return result.join("");
}
