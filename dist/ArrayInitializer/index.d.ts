import { ObservableArrayBase, ReadOnlyObservableArray } from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";
export declare type ArrayInitializerCallback<TI, TO> = (value: TI, index: number, currentObject?: TO) => TO | undefined;
export interface ArrayInitializerDefinition<TI, TO> {
    input: ObservableArrayBase<TI>;
    fn: ArrayInitializerCallback<TI, TO>;
}
export declare class ArrayInitializer<TI, TO extends ManagedObject> extends ManagedObject {
    static givenDefinition<TI, TO extends ManagedObject>(definition: ArrayInitializerDefinition<TI, TO>): ArrayInitializer<TI, TO>;
    private _objects;
    readonly objects: ReadOnlyObservableArray<TO>;
    private _input;
    private _callback;
    private _previousInput;
    private constructor();
    initManagedObject(): void;
}
