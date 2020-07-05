export async function stringWithEachMatchReplaced(
  input: string,
  regex: RegExp,
  replace: (match: RegExpMatchArray) => string | Promise<string>
): Promise<string> {
  let result: string = input;

  let match = result.match(regex);
  while (match != null) {
    const replaceText = await replace(match);
    const index = match.index;

    if (index != null) {
      result =
        result.slice(0, index) +
        replaceText +
        result.slice(index + match[0].length);
    }

    match = result.match(regex);
  }

  return result;
}
