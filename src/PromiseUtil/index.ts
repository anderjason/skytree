import { promiseOfSequentialActions } from "./promiseOfSequentialActions";
import { promiseOfRepeatedActions } from "./promiseOfRepeatedActions";
import { promiseOfResults } from "./promiseOfResults";
import { promiseOfInfiniteDelay } from "./promiseOfInfiniteDelay";
import { promiseOfFirstMatchingValue } from "./promiseOfFirstMatchingValue";

export class PromiseUtil {
  static promiseOfSequentialActions = promiseOfSequentialActions;
  static promiseOfRepeatedActions = promiseOfRepeatedActions;
  static promiseOfResults = promiseOfResults;
  static promiseOfInfiniteDelay = promiseOfInfiniteDelay;
  static promiseOfFirstMatchingValue = promiseOfFirstMatchingValue;
}
