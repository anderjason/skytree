export type ArrayOrderDirection = "ascending" | "descending";

export function arrayWithOrderFromValue<T, TV>(
  input: T[],
  getSortableValue: (value: T) => TV,
  direction: ArrayOrderDirection
): T[] {
  const result = [...input];

  if (direction === "descending") {
    result.sort((a, b) => {
      const valueA = getSortableValue(a);
      const valueB = getSortableValue(b);

      if (valueA < valueB) {
        return 1;
      }

      if (valueA > valueB) {
        return -1;
      }

      return 0;
    });
  } else {
    result.sort((a, b) => {
      const valueA = getSortableValue(a);
      const valueB = getSortableValue(b);

      if (valueA < valueB) {
        return -1;
      }

      if (valueA > valueB) {
        return 1;
      }

      return 0;
    });
  }

  return result;
}
