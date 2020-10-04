import { ObservableBase, ReadOnlyObservable } from "@anderjason/observable";
import { Actor } from "../Actor";
export declare type ExclusiveActivatorCallback<T> = (newValue: T, oldValue: T, currentObject?: Actor) => Actor | undefined;
export interface ExclusiveActivatorProps<T> {
    input: ObservableBase<T>;
    fn: ExclusiveActivatorCallback<T>;
}
export declare class ExclusiveActivator<T> extends Actor<ExclusiveActivatorProps<T>> {
    private _output;
    readonly output: ReadOnlyObservable<Actor<any>>;
    private _lastObject;
    onActivate(): void;
}
