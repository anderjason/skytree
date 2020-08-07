import { promiseOfDelay } from "./_internal/promiseOfDelay";
import { promiseOfFirstMatchingValue } from "./_internal/promiseOfFirstMatchingValue";
import { promiseOfInfiniteDelay } from "./_internal/promiseOfInfiniteDelay";
import { promiseOfRepeatedActions } from "./_internal/promiseOfRepeatedActions";
import { promiseOfResults } from "./_internal/promiseOfResults";
import { promiseOfSequentialActions } from "./_internal/promiseOfSequentialActions";
export declare class PromiseUtil {
    static promiseOfDelay: typeof promiseOfDelay;
    static promiseOfFirstMatchingValue: typeof promiseOfFirstMatchingValue;
    static promiseOfInfiniteDelay: typeof promiseOfInfiniteDelay;
    static promiseOfRepeatedActions: typeof promiseOfRepeatedActions;
    static promiseOfResults: typeof promiseOfResults;
    static promiseOfSequentialActions: typeof promiseOfSequentialActions;
}
