import { ManagedObject } from "../ManagedObject";
import { ObservableBase } from "../Observable";
import { ReadOnlyObservable } from "..";
export declare type ExclusiveInitializerCallback<T> = (newValue: T, oldValue: T, currentObject?: ManagedObject) => ManagedObject | undefined;
export interface ExclusiveInitializerDefinition<T> {
    input: ObservableBase<T>;
    fn: ExclusiveInitializerCallback<T>;
}
export declare class ExclusiveInitializer<T> extends ManagedObject {
    static givenDefinition<T>(definition: ExclusiveInitializerDefinition<T>): ExclusiveInitializer<T>;
    private _output;
    readonly output: ReadOnlyObservable<ManagedObject>;
    private _input;
    private _callback;
    private constructor();
    initManagedObject(): void;
}
