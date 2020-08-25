import { SimpleEvent } from "../SimpleEvent";
import { ObservableSet, ObservableSetChange } from "../ObservableSet";
export declare class ReadOnlyObservableSet<T> {
    static givenObservableSet<T>(observableSet: ObservableSet<T>): ReadOnlyObservableSet<T>;
    private _observableSet;
    private _isObservableSet;
    private constructor();
    get count(): number;
    hasValue(value: T): boolean;
    toValues(): T[];
    get didChange(): SimpleEvent<T[]>;
    get didChangeSteps(): SimpleEvent<ObservableSetChange<T>[]>;
}
