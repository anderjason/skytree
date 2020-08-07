export interface SetDifference<T> {
    addedItems: T[];
    removedItems: T[];
    isEqual: boolean;
}
export declare function differenceGivenSets<T>(thisSet: Set<T>, otherSet: Set<T>, isValueEqual?: (thisValue: T, otherValue: T) => boolean): SetDifference<T>;
