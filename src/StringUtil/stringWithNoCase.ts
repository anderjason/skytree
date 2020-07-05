const hasSpace = /\s/;
const hasSeparator = /(_|-|\.|:)/;
const hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;
const separatorSplitter = /[\W_]+(.|$)/g;
const camelSplitter = /(.)([A-Z]+)/g;

function unseparate(input: string) {
  return input.replace(separatorSplitter, (m: any, next: any) => {
    return next ? " " + next : "";
  });
}

function uncamelize(input: string) {
  return input.replace(camelSplitter, function (
    m: any,
    previous: any,
    uppers: any
  ) {
    return previous + " " + uppers.toLowerCase().split("").join(" ");
  });
}

export function stringWithNoCase(input: string): string {
  if (input == null) {
    throw new Error("input is required");
  }

  if (hasSpace.test(input)) {
    return input.toLowerCase();
  }

  if (hasSeparator.test(input)) {
    return (unseparate(input) || input).toLowerCase();
  }

  if (hasCamel.test(input)) {
    return uncamelize(input).toLowerCase();
  }

  return input.toLowerCase();
}
