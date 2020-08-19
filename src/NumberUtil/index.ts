import { randomNumberGivenRange } from "./_internal/randomNumberGivenRange";
import { numberWithDecimalPlaceLimit } from "./_internal/numberWithDecimalPlaceLimit";
import { numberWithEasing } from "./_internal/numberWithEasing";
import { numberWithHardLimit } from "./_internal/numberWithHardLimit";
import { numberWithQuantization } from "./_internal/numberWithQuantization";
import { numberWithRangeMap } from "./_internal/numberWithRangeMap";

export class NumberUtil {
  static randomNumberGivenRange = randomNumberGivenRange;
  static numberWithDecimalPlaceLimit = numberWithDecimalPlaceLimit;
  static numberWithEasing = numberWithEasing;
  static numberWithHardLimit = numberWithHardLimit;
  static numberWithQuantization = numberWithQuantization;
  static numberWithRangeMap = numberWithRangeMap;
}
