import { objectIsDeepEqual } from "./_internal/objectIsDeepEqual";
import { objectIsEmpty } from "./_internal/objectIsEmpty";
import { objectIsShallowEqual } from "./_internal/objectIsShallowEqual";
import { objectWithDeepMerge } from "./_internal/objectWithDeepMerge";
import { objectWithoutBlankValues } from "./_internal/objectWithoutBlankValues";
import { objectWithValueAtPath } from "./_internal/objectWithValueAtPath";
import { unionGivenObjects } from "./_internal/unionGivenObjects";
import { optionalValueAtPathGivenObject } from "./_internal/optionalValueAtPathGivenObject";

export class ObjectUtil {
  static objectIsDeepEqual = objectIsDeepEqual;
  static objectIsEmpty = objectIsEmpty;
  static objectIsShallowEqual = objectIsShallowEqual;
  static objectWithDeepMerge = objectWithDeepMerge;
  static objectWithoutBlankValues = objectWithoutBlankValues;
  static objectWithValueAtPath = objectWithValueAtPath;
  static unionGivenObjects = unionGivenObjects;
  static optionalValueAtPathGivenObject = optionalValueAtPathGivenObject;
}
