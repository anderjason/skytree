import { asyncDelayGivenDuration } from "./_internal/asyncDelayGivenDuration";
import { asyncDelayOfForever } from "./_internal/asyncDelayOfForever";
import { asyncLargeSequenceGivenDefinition } from "./_internal/asyncLargeSequenceGivenDefinition";
import { asyncSequenceGivenArrayAndCallback } from "./_internal/asyncSequenceGivenArrayAndCallback";
import { asyncSequenceGivenCountAndCallback } from "./_internal/asyncSequenceGivenCountAndCallback";
import { asyncValueGivenArrayAndFilter } from "./_internal/asyncValueGivenArrayAndFilter";
import { asyncValuesGivenArrayAndConverter } from "./_internal/asyncValuesGivenArrayAndConverter";
export declare class PromiseUtil {
    static asyncDelayGivenDuration: typeof asyncDelayGivenDuration;
    static asyncDelayOfForever: typeof asyncDelayOfForever;
    static asyncLargeSequenceGivenDefinition: typeof asyncLargeSequenceGivenDefinition;
    static asyncSequenceGivenArrayAndCallback: typeof asyncSequenceGivenArrayAndCallback;
    static asyncSequenceGivenCountAndCallback: typeof asyncSequenceGivenCountAndCallback;
    static asyncValueGivenArrayAndFilter: typeof asyncValueGivenArrayAndFilter;
    static asyncValuesGivenArrayAndConverter: typeof asyncValuesGivenArrayAndConverter;
}
