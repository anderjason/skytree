import { SimpleEvent } from "../SimpleEvent";
export interface ObservableArrayChange<T> {
    type: "add" | "remove" | "move";
    value?: T;
    newIndex?: number;
    oldIndex?: number;
}
export declare class ObservableArray<T> {
    readonly didChange: SimpleEvent<ObservableArrayChange<T>[]>;
    static ofEmpty<T>(): ObservableArray<T>;
    static givenValues<T>(values: T[]): ObservableArray<T>;
    static isObservableArray(input: any): input is ObservableArray<unknown>;
    private _array;
    private _isObservableArray;
    private constructor();
    addValue(value: T, index?: number): void;
    moveValueAtIndex(oldIndex: number, newIndex: number): void;
    replaceValueAtIndex: (index: number, value: T) => void;
    private _internalMove;
    removeValueAtIndex(index: number): void;
    removeAllWhere(filter: (value: T, index: number) => boolean): void;
    clear(): void;
    hasValue(value: T): boolean;
    toValues(): T[];
    toCount(): number;
}
