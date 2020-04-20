import { Handle } from "../Handle";
export declare type SimpleEventHandler<T> = (newValue: T, oldValue?: T) => void;
export declare class SimpleEvent<T = void> {
    private _handlers;
    private _lastEvent?;
    static ofEmpty<T = void>(): SimpleEvent<T>;
    static ofLastValue<T>(lastEvent: T): SimpleEvent<T>;
    private constructor();
    subscribe(handler: SimpleEventHandler<T>, includeLast?: boolean): Handle;
    emit(event: T): void;
    private unsubscribe;
}
