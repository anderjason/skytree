export function arrayWithPageSubset<T>(
  input: T[],
  startIndex: number,
  pageSize: number
): T[] {
  const start = startIndex;
  const end = start + pageSize;

  return input.slice(start, end);
}
