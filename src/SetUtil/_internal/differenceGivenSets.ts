function defaultIsValueEqual<TV>(thisValue: TV, otherValue: TV): boolean {
  return thisValue === otherValue;
}

export interface SetDifference<T> {
  addedItems: T[];
  removedItems: T[];
  isEqual: boolean;
}

export function differenceGivenSets<T>(
  thisSet: Set<T>,
  otherSet: Set<T>,
  isValueEqual: (thisValue: T, otherValue: T) => boolean = defaultIsValueEqual
): SetDifference<T> {
  const removedItems: T[] = [];
  let isEqual = true;

  const otherSetCopy = new Set(otherSet);

  thisSet.forEach((v) => {
    if (v == null) {
      return;
    }

    otherSetCopy.delete(v);

    if (!otherSet.has(v)) {
      removedItems.push(v);
      isEqual = false;
    }
  });

  return {
    addedItems: Array.from(otherSetCopy),
    removedItems,
    isEqual,
  };
}
