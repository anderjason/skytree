import { SimpleEvent } from "../SimpleEvent";
import { ObservableArray, ObservableArrayChange } from "../ObservableArray";
export declare class ReadOnlyObservableArray<T> {
    static givenObservableArray<T>(observableArray: ObservableArray<T>): ReadOnlyObservableArray<T>;
    private _observableArray;
    private _isObservableArray;
    private constructor();
    get count(): number;
    hasValue(value: T): boolean;
    toOptionalValueGivenIndex(index: number): T | undefined;
    toIndexOfValue(value: T, fromIndex?: number): number;
    toValues(): T[];
    get didChange(): SimpleEvent<T[]>;
    get didChangeSteps(): SimpleEvent<ObservableArrayChange<T>[]>;
}
