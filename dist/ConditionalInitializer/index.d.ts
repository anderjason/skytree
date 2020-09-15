import { ObservableBase, ReadOnlyObservable } from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";
export interface ConditionalInitializerProps<TI, TO> {
    input: ObservableBase<TI>;
    fn: (input: TI) => boolean;
    instance: TO;
}
export declare class ConditionalInitializer<TI, TO extends ManagedObject> extends ManagedObject<ConditionalInitializerProps<TI, TO>> {
    private _output;
    readonly output: ReadOnlyObservable<TO>;
    onActivate(): void;
}
