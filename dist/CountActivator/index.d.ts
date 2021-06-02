import { ReadOnlyObservableArray, ObservableBase } from "@anderjason/observable";
import { Actor } from "../Actor";
export declare type CountActivatorCallback<T> = (index: number) => T | undefined;
export interface CountActivatorProps<T> {
    input: number | ObservableBase<number>;
    fn: CountActivatorCallback<T>;
}
export declare class CountActivator<T extends Actor> extends Actor<CountActivatorProps<T>> {
    private _output;
    readonly output: ReadOnlyObservableArray<T>;
    private _input;
    constructor(props: CountActivatorProps<T>);
    onActivate(): void;
}
