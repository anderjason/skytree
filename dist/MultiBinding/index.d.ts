import { ManagedObject } from "../ManagedObject";
import { ObservableBase } from "../Observable";
import { ObservableSet } from "../ObservableSet";
import { SimpleEvent } from "../SimpleEvent";
export declare type MultiBindingInvalidateMode = "immediate" | "nextFrame";
export interface MultiBindingDefinition {
    inputs: ObservableBase<any>[] | ObservableSet<ObservableBase<any>>;
    invalidateMode: MultiBindingInvalidateMode;
}
export declare class MultiBinding extends ManagedObject {
    static givenDefinition(definition: MultiBindingDefinition): MultiBinding;
    readonly didInvalidate: SimpleEvent<void>;
    readonly inputs: ObservableSet<ObservableBase<any>>;
    private _inputHandles;
    private _invalidateMode;
    private _isInvalidating;
    private constructor();
    initManagedObject(): void;
    private subscribeInputs;
    private unsubscribeInputs;
    private onChange;
}
