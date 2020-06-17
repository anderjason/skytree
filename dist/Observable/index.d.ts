import { SimpleEvent } from "../SimpleEvent";
export declare type ObservableFilter<T> = (newValue: T, oldValue: T) => boolean;
export declare class Observable<T = number> {
    readonly didChange: SimpleEvent<T>;
    static isStrictEqual<T>(newValue: T, oldValue: T): boolean;
    static isObservable(input: any): input is Observable<unknown>;
    static givenValue<T>(value: T, discardFilter?: ObservableFilter<T>): Observable<T>;
    static ofEmpty<T>(discardFilter?: ObservableFilter<T>): Observable<T>;
    private _value;
    private _isObservable;
    private _discardFilter;
    private constructor();
    get value(): T;
    setValue(newValue: T): void;
    mutate: (fn: (value: T) => void) => void;
}
