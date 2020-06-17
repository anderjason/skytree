import { Duration } from "../Duration";
import { ManagedObject } from "../ManagedObject";
export declare class ManagedInterval extends ManagedObject {
    static givenCallback(callback: Function, duration: Duration): ManagedInterval;
    private _interval;
    private _duration;
    private _callback;
    private constructor();
    initManagedObject(): void;
}
