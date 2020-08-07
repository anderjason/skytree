import { setIsEqual } from "./_internal/setIsEqual";
import { intersectionGivenSets } from "./_internal/intersectionGivenSets";
import { setWithItem } from "./_internal/setWithItem";
import { setWithoutItem } from "./_internal/setWithoutItem";
import { differenceGivenSets } from "./_internal/differenceGivenSets";
import { unionGivenSets } from "./_internal/unionGivenSets";

export class SetUtil {
  static setIsEqual = setIsEqual;
  static intersectionGivenSets = intersectionGivenSets;
  static differenceGivenSets = differenceGivenSets;
  static unionGivenSets = unionGivenSets;
  static setWithItem = setWithItem;
  static setWithoutItem = setWithoutItem;
}
