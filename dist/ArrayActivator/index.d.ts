import { ObservableArrayBase, ReadOnlyObservableArray } from "@anderjason/observable";
import { Actor } from "../Actor";
export declare type ArrayActivatorCallback<TI, TO> = (value: TI, index: number, currentObject?: TO) => TO | undefined;
export interface ArrayActivatorProps<TI, TO> {
    input: TI[] | ObservableArrayBase<TI>;
    fn: ArrayActivatorCallback<TI, TO>;
}
export declare class ArrayActivator<TI, TO extends Actor> extends Actor<ArrayActivatorProps<TI, TO>> {
    private _output;
    readonly output: ReadOnlyObservableArray<TO>;
    private _previousInput;
    private _observableInput;
    constructor(props: ArrayActivatorProps<TI, TO>);
    onActivate(): void;
}
