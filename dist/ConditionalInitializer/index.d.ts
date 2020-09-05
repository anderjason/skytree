import { ObservableBase, ReadOnlyObservable } from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";
export interface ConditionalInitializerDefinition<TI, TO> {
    input: ObservableBase<TI>;
    fn: (input: TI) => boolean;
    instance: TO;
}
export declare class ConditionalInitializer<TI, TO extends ManagedObject> extends ManagedObject {
    static givenDefinition<TI, TO extends ManagedObject>(definition: ConditionalInitializerDefinition<TI, TO>): ConditionalInitializer<TI, TO>;
    private _output;
    readonly output: ReadOnlyObservable<TO>;
    private _input;
    private _shouldInitialize;
    private _instance;
    private constructor();
    initManagedObject(): void;
}
