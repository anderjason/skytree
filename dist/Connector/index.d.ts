import { ManagedObject } from "../ManagedObject";
import { Observable, ObservableBase } from "@anderjason/observable";
export interface ConnectorDefinition<T> {
    source?: ObservableBase<T>;
    target?: Observable<T>;
}
export declare class Connector<T> extends ManagedObject {
    static givenDefinition<T>(definition: ConnectorDefinition<T>): Connector<T>;
    readonly source: Observable<ObservableBase<T>>;
    readonly target: Observable<Observable<T>>;
    private _sourceValueHandle;
    private constructor();
    initManagedObject(): void;
    private updateTarget;
}
