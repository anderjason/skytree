import { promiseOfSequentialActions } from "./promiseOfSequentialActions";
import { promiseOfRepeatedActions } from "./promiseOfRepeatedActions";
import { promiseOfResults } from "./promiseOfResults";

export class PromiseUtil {
  static promiseOfSequentialActions = promiseOfSequentialActions;
  static promiseOfRepeatedActions = promiseOfRepeatedActions;
  static promiseOfResults = promiseOfResults;
}
