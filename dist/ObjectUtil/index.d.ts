import { objectIsDeepEqual } from "./_internal/objectIsDeepEqual";
import { objectIsEmpty } from "./_internal/objectIsEmpty";
import { objectIsShallowEqual } from "./_internal/objectIsShallowEqual";
import { objectWithDeepMerge } from "./_internal/objectWithDeepMerge";
import { objectWithoutBlankValues } from "./_internal/objectWithoutBlankValues";
import { objectWithValueAtPath } from "./_internal/objectWithValueAtPath";
import { unionGivenObjects } from "./_internal/unionGivenObjects";
import { optionalValueAtPathGivenObject } from "./_internal/optionalValueAtPathGivenObject";
export declare class ObjectUtil {
    static objectIsDeepEqual: typeof objectIsDeepEqual;
    static objectIsEmpty: typeof objectIsEmpty;
    static objectIsShallowEqual: typeof objectIsShallowEqual;
    static objectWithDeepMerge: typeof objectWithDeepMerge;
    static objectWithoutBlankValues: typeof objectWithoutBlankValues;
    static objectWithValueAtPath: typeof objectWithValueAtPath;
    static unionGivenObjects: typeof unionGivenObjects;
    static optionalValueAtPathGivenObject: typeof optionalValueAtPathGivenObject;
}
