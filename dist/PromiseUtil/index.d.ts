import { promiseOfSequentialActions } from "./promiseOfSequentialActions";
import { promiseOfRepeatedActions } from "./promiseOfRepeatedActions";
import { promiseOfResults } from "./promiseOfResults";
import { promiseOfInfiniteDelay } from "./promiseOfInfiniteDelay";
export declare class PromiseUtil {
    static promiseOfSequentialActions: typeof promiseOfSequentialActions;
    static promiseOfRepeatedActions: typeof promiseOfRepeatedActions;
    static promiseOfResults: typeof promiseOfResults;
    static promiseOfInfiniteDelay: typeof promiseOfInfiniteDelay;
}
