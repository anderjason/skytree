import { ObservableArrayBase, ReadOnlyObservableArray } from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";
export declare type ArrayInitializerCallback<TI, TO> = (value: TI, index: number, currentObject?: TO) => TO | undefined;
export interface ArrayInitializerProps<TI, TO> {
    input: ObservableArrayBase<TI>;
    fn: ArrayInitializerCallback<TI, TO>;
}
export declare class ArrayInitializer<TI, TO extends ManagedObject> extends ManagedObject<ArrayInitializerProps<TI, TO>> {
    private _output;
    readonly output: ReadOnlyObservableArray<TO>;
    private _previousInput;
    onActivate(): void;
}
