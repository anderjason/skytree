import { Duration, ManagedObject } from "..";
export declare class ManagedInterval extends ManagedObject {
    static ofFunction(callback: Function, duration: Duration): ManagedInterval;
    private _interval;
    private _duration;
    private _callback;
    private constructor();
    initManagedObject(): void;
}
