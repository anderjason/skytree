import { ManagedObject } from "../ManagedObject";
import { Duration } from "../Duration";
export declare class ManagedTimeout extends ManagedObject {
    static givenCallback(callback: Function, duration: Duration): ManagedTimeout;
    private _timeout;
    private _duration;
    private _callback;
    private _didFire;
    private constructor();
    get didFire(): boolean;
    initManagedObject(): void;
}
