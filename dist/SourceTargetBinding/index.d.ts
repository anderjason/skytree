import { Actor } from "../Actor";
import { Observable, ObservableBase, ReadOnlyObservable } from "@anderjason/observable";
export interface SourceTargetBindingProps<T> {
    source?: T | ObservableBase<T>;
    target?: Observable<T>;
}
export declare class SourceTargetBinding<T> extends Actor<SourceTargetBindingProps<T>> {
    private _source;
    readonly source: ReadOnlyObservable<ObservableBase<T>>;
    private _target;
    readonly target: ReadOnlyObservable<Observable<T>>;
    private _sourceValueReceipt;
    onActivate(): void;
    setSource(newSource: T | ObservableBase<T>): void;
    setTarget(newTarget: Observable<T>): void;
    private updateTarget;
}
