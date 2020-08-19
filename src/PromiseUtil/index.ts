import { asyncDelayGivenDuration } from "./_internal/asyncDelayGivenDuration";
import { asyncDelayOfForever } from "./_internal/asyncDelayOfForever";
import { asyncLargeSequenceGivenDefinition } from "./_internal/asyncLargeSequenceGivenDefinition";
import { asyncSequenceGivenArrayAndCallback } from "./_internal/asyncSequenceGivenArrayAndCallback";
import { asyncSequenceGivenCountAndCallback } from "./_internal/asyncSequenceGivenCountAndCallback";
import { asyncValueGivenArrayAndFilter } from "./_internal/asyncValueGivenArrayAndFilter";
import { asyncValuesGivenArrayAndConverter } from "./_internal/asyncValuesGivenArrayAndConverter";

export class PromiseUtil {
  static asyncDelayGivenDuration = asyncDelayGivenDuration;
  static asyncDelayOfForever = asyncDelayOfForever;
  static asyncLargeSequenceGivenDefinition = asyncLargeSequenceGivenDefinition;
  static asyncSequenceGivenArrayAndCallback = asyncSequenceGivenArrayAndCallback;
  static asyncSequenceGivenCountAndCallback = asyncSequenceGivenCountAndCallback;
  static asyncValueGivenArrayAndFilter = asyncValueGivenArrayAndFilter;
  static asyncValuesGivenArrayAndConverter = asyncValuesGivenArrayAndConverter;
}
