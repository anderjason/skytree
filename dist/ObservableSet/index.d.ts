import { SimpleEvent } from "../SimpleEvent";
export interface ObservableSetChange<T> {
    type: "add" | "remove";
    value: T;
}
export declare class ObservableSet<T> {
    readonly didChange: SimpleEvent<ObservableSetChange<T>>;
    static ofEmpty<T>(): ObservableSet<T>;
    static givenValues<T>(values: T[] | Set<T>): ObservableSet<T>;
    static isObservableSet(input: any): input is ObservableSet<unknown>;
    private _set;
    private _isObservableSet;
    private constructor();
    addValue(value: T): boolean;
    removeValue(value: T): boolean;
    clear(): void;
    hasValue(value: T): boolean;
    toValues(): T[];
    toCount(): number;
}
