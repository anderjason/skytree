import { ObservableBase, ReadOnlyObservable } from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";
export declare type ExclusiveInitializerCallback<T> = (newValue: T, oldValue: T, currentObject?: ManagedObject) => ManagedObject | undefined;
export interface ExclusiveInitializerProps<T> {
    input: ObservableBase<T>;
    fn: ExclusiveInitializerCallback<T>;
}
export declare class ExclusiveInitializer<T> extends ManagedObject<ExclusiveInitializerProps<T>> {
    private _output;
    readonly output: ReadOnlyObservable<ManagedObject<any>>;
    private _lastObject;
    onActivate(): void;
}
