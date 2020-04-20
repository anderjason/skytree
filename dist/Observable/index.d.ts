import { SimpleEvent } from "../SimpleEvent";
export declare class Observable<T = number> {
    readonly didChange: SimpleEvent<T>;
    static isObservable(input: any): input is Observable<unknown>;
    static ofValue<T>(value: T): Observable<T>;
    private _value;
    private _isObservable;
    private constructor();
    get value(): T;
    setValue(value: T): void;
    mutate: (fn: (value: T) => void) => void;
}
