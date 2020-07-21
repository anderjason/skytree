function defaultIsValueEqual<TV>(thisValue: TV, otherValue: TV): boolean {
  return thisValue === otherValue;
}

interface AddedItem<TK, TV> {
  key: TK;
  newValue: TV;
}

interface ChangedItem<TK, TV> {
  key: TK;
  oldValue: TV;
  newValue: TV;
}

interface RemovedItem<TK, TV> {
  key: TK;
  oldValue: TV;
}

export interface MapDifference<TK, TV> {
  addedItems: AddedItem<TK, TV>[];
  changedItems: ChangedItem<TK, TV>[];
  removedItems: RemovedItem<TK, TV>[];
  isEqual: boolean;
}

export function differenceGivenMaps<TK, TV>(
  thisMap: Map<TK, TV>,
  otherMap: Map<TK, TV>,
  isValueEqual: (thisValue: TV, otherValue: TV) => boolean = defaultIsValueEqual
): MapDifference<TK, TV> {
  const addedItems: AddedItem<TK, TV>[] = [];
  const changedItems: ChangedItem<TK, TV>[] = [];
  const removedItems: RemovedItem<TK, TV>[] = [];

  const allKeys = new Set<TK>();
  for (const key of thisMap.keys()) {
    allKeys.add(key);
  }
  for (const key of otherMap.keys()) {
    allKeys.add(key);
  }

  allKeys.forEach((key) => {
    const thisValue = thisMap.get(key);
    const otherValue = otherMap.get(key);

    if (thisValue == null && otherValue == null) {
      return;
    } else if (otherValue == null) {
      removedItems.push({
        key,
        oldValue: thisValue!,
      });
    } else if (thisValue == null) {
      addedItems.push({
        key,
        newValue: otherValue,
      });
    } else {
      if (!isValueEqual(thisValue, otherValue)) {
        changedItems.push({
          key,
          oldValue: thisValue,
          newValue: otherValue,
        });
      }
    }
  });

  return {
    addedItems,
    changedItems,
    removedItems,
    isEqual:
      addedItems.length === 0 &&
      changedItems.length === 0 &&
      removedItems.length === 0,
  };
}
