import { promiseOfDelay } from "./_internal/promiseOfDelay";
import { promiseOfFirstMatchingValue } from "./_internal/promiseOfFirstMatchingValue";
import { promiseOfInfiniteDelay } from "./_internal/promiseOfInfiniteDelay";
import { promiseOfRepeatedActions } from "./_internal/promiseOfRepeatedActions";
import { promiseOfResults } from "./_internal/promiseOfResults";
import { promiseOfSequentialActions } from "./_internal/promiseOfSequentialActions";

export class PromiseUtil {
  static promiseOfDelay = promiseOfDelay;
  static promiseOfFirstMatchingValue = promiseOfFirstMatchingValue;
  static promiseOfInfiniteDelay = promiseOfInfiniteDelay;
  static promiseOfRepeatedActions = promiseOfRepeatedActions;
  static promiseOfResults = promiseOfResults;
  static promiseOfSequentialActions = promiseOfSequentialActions;
}
