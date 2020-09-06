import { ManagedObject } from "../ManagedObject";
import { Duration } from "@anderjason/time";
export interface TimerDefinition {
    fn: () => void;
    duration: Duration;
    isRepeating?: boolean;
}
export declare class Timer extends ManagedObject {
    static givenDefinition(definition: TimerDefinition): Timer;
    private _timeout;
    private _duration;
    private _fn;
    private _isRepeating;
    private constructor();
    initManagedObject(): void;
}
