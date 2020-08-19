import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
import { ObservableSet } from "../ObservableSet";
import { SimpleEvent } from "../SimpleEvent";
export declare class MultiBinding extends ManagedObject {
    static givenInputs(inputs: Observable<any>[] | ObservableSet<Observable<any>>): MultiBinding;
    readonly didInvalidate: SimpleEvent<void>;
    readonly inputs: ObservableSet<Observable<any>>;
    private _inputHandles;
    private constructor();
    initManagedObject(): void;
    private subscribeInputs;
    private unsubscribeInputs;
    private onChange;
}
