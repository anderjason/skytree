import { arrayWithOrderFromValue } from "./arrayWithOrderFromValue";
import { arrayWithoutItem } from "./arrayWithoutItem";
import { optionalRandomItemGivenArray } from "./optionalRandomItemGivenArray";
import { arrayWithoutDuplicateItems } from "./arrayWithoutDuplicateItems";
import { equalSizeGroupsGivenArray } from "./equalSizeGroupsGivenArray";
import { optionalLastItemGivenArray } from "./optionalLastItemGivenArray";
import { pageItemsGivenArray } from "./pageItemsGivenArray";
import { numberArrayGivenRange } from "./numberArrayGivenRange";

export class ArrayUtil {
  static arrayWithOrderFromValue = arrayWithOrderFromValue;
  static arrayWithoutDuplicateItems = arrayWithoutDuplicateItems;
  static arrayWithoutItem = arrayWithoutItem;
  static equalSizeGroupsGivenArray = equalSizeGroupsGivenArray;
  static numberArrayGivenRange = numberArrayGivenRange;
  static optionalLastItemGivenArray = optionalLastItemGivenArray;
  static optionalRandomItemGivenArray = optionalRandomItemGivenArray;
  static pageItemsGivenArray = pageItemsGivenArray;
}
