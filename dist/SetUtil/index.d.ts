import { setIsEqual } from "./_internal/setIsEqual";
import { intersectionGivenSets } from "./_internal/intersectionGivenSets";
import { setWithItem } from "./_internal/setWithItem";
import { setWithoutItem } from "./_internal/setWithoutItem";
import { differenceGivenSets } from "./_internal/differenceGivenSets";
import { unionGivenSets } from "./_internal/unionGivenSets";
export declare class SetUtil {
    static setIsEqual: typeof setIsEqual;
    static intersectionGivenSets: typeof intersectionGivenSets;
    static differenceGivenSets: typeof differenceGivenSets;
    static unionGivenSets: typeof unionGivenSets;
    static setWithItem: typeof setWithItem;
    static setWithoutItem: typeof setWithoutItem;
}
