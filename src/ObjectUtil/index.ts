import { valueAtPathGivenObject } from "./valueAtPathGivenObject";
import { unionGivenObjects } from "./unionGivenObjects";
import { objectGivenQueryString } from "./objectGivenQueryString";
import { objectIsDeepEqual } from "./objectIsDeepEqual";
import { objectIsEmpty } from "./objectIsEmpty";
import { objectIsShallowEqual } from "./objectIsShallowEqual";
import { objectWithDeepMerge } from "./objectWithDeepMerge";
import { objectWithoutBlankValues } from "./objectWithoutBlankValues";
import { objectWithValueAtPath } from "./objectWithValueAtPath";
import { queryStringGivenObject } from "./queryStringGivenObject";

export class ObjectUtil {
  static unionGivenObjects = unionGivenObjects;
  static objectGivenQueryString = objectGivenQueryString;
  static objectIsDeepEqual = objectIsDeepEqual;
  static objectIsEmpty = objectIsEmpty;
  static objectIsShallowEqual = objectIsShallowEqual;
  static objectWithDeepMerge = objectWithDeepMerge;
  static objectWithoutBlankValues = objectWithoutBlankValues;
  static objectWithValueAtPath = objectWithValueAtPath;
  static queryStringGivenObject = queryStringGivenObject;
  static valueAtPathGivenObject = valueAtPathGivenObject;
}
