import { setIsEqualToSet } from "./_internal/setIsEqualToSet";
import { intersectionGivenSets } from "./_internal/intersectionGivenSets";
import { setWithItem } from "./_internal/setWithItem";
import { setWithoutItem } from "./_internal/setWithoutItem";

export class SetUtil {
  static setIsEqual = setIsEqualToSet;
  static setIsEqualToSet = setIsEqualToSet; // deprecated
  static intersectionGivenSets = intersectionGivenSets;
  static setWithItem = setWithItem;
  static setWithoutItem = setWithoutItem;
}
