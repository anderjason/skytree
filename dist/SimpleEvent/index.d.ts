import { Handle } from "../Handle";
export declare type SimpleEventHandler<T> = (newValue: T, oldValue?: T) => void | Promise<void>;
export declare class SimpleEvent<T = void> {
    private _handlers;
    private _lastValue?;
    static ofEmpty<T = void>(): SimpleEvent<T>;
    static givenLastValue<T>(lastValue: T): SimpleEvent<T>;
    private constructor();
    subscribe(handler: SimpleEventHandler<T>, includeLast?: boolean): Handle;
    emit: (event: T) => Promise<void>;
    private unsubscribe;
}
