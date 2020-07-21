import { valueAtPathGivenObject } from "./valueAtPathGivenObject";
import { mergedObjectGivenObjects } from "./mergedObjectGivenObjects";
import { objectGivenQueryString } from "./objectGivenQueryString";
import { objectIsDeepEqualToObject } from "./objectIsDeepEqualToObject";
import { objectIsEmpty } from "./objectIsEmpty";
import { objectIsShallowEqualToObject } from "./objectIsShallowEqualToObject";
import { objectWithDeepMerge } from "./objectWithDeepMerge";
import { objectWithoutBlankValues } from "./objectWithoutBlankValues";
import { objectWithValueAtPath } from "./objectWithValueAtPath";
import { queryStringGivenObject } from "./queryStringGivenObject";

export class ObjectUtil {
  static mergedObjectGivenObjects = mergedObjectGivenObjects;
  static objectGivenQueryString = objectGivenQueryString;
  static objectIsDeepEqual = objectIsDeepEqualToObject;
  static objectIsDeepEqualToObject = objectIsDeepEqualToObject; // deprecated
  static objectIsEmpty = objectIsEmpty;
  static objectIsShallowEqual = objectIsShallowEqualToObject;
  static objectIsShallowEqualToObject = objectIsShallowEqualToObject; // deprecated
  static objectWithDeepMerge = objectWithDeepMerge;
  static objectWithoutBlankValues = objectWithoutBlankValues;
  static objectWithValueAtPath = objectWithValueAtPath;
  static queryStringGivenObject = queryStringGivenObject;
  static valueAtPathGivenObject = valueAtPathGivenObject;
}
