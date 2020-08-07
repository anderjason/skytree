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
export declare class ObjectUtil {
    static unionGivenObjects: typeof unionGivenObjects;
    static objectGivenQueryString: typeof objectGivenQueryString;
    static objectIsDeepEqual: typeof objectIsDeepEqual;
    static objectIsEmpty: typeof objectIsEmpty;
    static objectIsShallowEqual: typeof objectIsShallowEqual;
    static objectWithDeepMerge: typeof objectWithDeepMerge;
    static objectWithoutBlankValues: typeof objectWithoutBlankValues;
    static objectWithValueAtPath: typeof objectWithValueAtPath;
    static queryStringGivenObject: typeof queryStringGivenObject;
    static valueAtPathGivenObject: typeof valueAtPathGivenObject;
}
