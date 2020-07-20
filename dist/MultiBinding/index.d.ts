import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
import { ObservableSet } from "../ObservableSet";
import { SimpleEvent } from "../SimpleEvent";
export declare class MultiBinding<T> extends ManagedObject {
    static givenInputs<T>(inputs: Observable<T>[]): MultiBinding<T>;
    static givenObservableInputSet<T>(inputSet: ObservableSet<Observable<T>>): MultiBinding<T>;
    readonly didChange: SimpleEvent<void>;
    readonly inputs: ObservableSet<Observable<T>>;
    private _inputHandles;
    private _willNotifyChange;
    private constructor();
    initManagedObject(): void;
    private subscribeInputs;
    private unsubscribeInputs;
    private onChange;
}
