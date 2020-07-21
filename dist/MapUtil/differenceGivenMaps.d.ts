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
export declare function differenceGivenMaps<TK, TV>(thisMap: Map<TK, TV>, otherMap: Map<TK, TV>, isValueEqual?: (thisValue: TV, otherValue: TV) => boolean): MapDifference<TK, TV>;
export {};
