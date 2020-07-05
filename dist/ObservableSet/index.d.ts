import { SimpleEvent } from "../SimpleEvent";
export interface ObservableSetChange<T> {
    type: "add" | "remove";
    value: T;
}
export declare class ObservableSet<T> {
    readonly didChange: SimpleEvent<ObservableSetChange<T>>;
    static ofEmpty<T>(): ObservableSet<T>;
    static givenValues<T>(values: T[] | Set<T>): ObservableSet<T>;
    private _set;
    private constructor();
    addValue(value: T): boolean;
    removeValue(value: T): boolean;
    hasValue(value: T): boolean;
    toValues(): T[];
    toCount(): number;
}
