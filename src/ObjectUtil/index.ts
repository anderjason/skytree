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
  static objectIsDeepEqualToObject = objectIsDeepEqualToObject;
  static objectIsEmpty = objectIsEmpty;
  static objectIsShallowEqualToObject = objectIsShallowEqualToObject;
  static objectWithDeepMerge = objectWithDeepMerge;
  static objectWithoutBlankValues = objectWithoutBlankValues;
  static objectWithValueAtPath = objectWithValueAtPath;
  static queryStringGivenObject = queryStringGivenObject;
  static valueAtPathGivenObject = valueAtPathGivenObject;
}
