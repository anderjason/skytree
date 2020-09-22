import { ManagedObject } from "../ManagedObject";
import { Observable, ObservableBase, ReadOnlyObservable } from "@anderjason/observable";
export interface ConnectorProps<T> {
    source?: T | ObservableBase<T>;
    target?: Observable<T>;
}
export declare class Connector<T> extends ManagedObject<ConnectorProps<T>> {
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
