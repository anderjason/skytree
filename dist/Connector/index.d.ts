import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
export interface ConnectorDefinition<T> {
    source?: Observable<T>;
    target?: Observable<T>;
}
export declare class Connector<T> extends ManagedObject {
    static givenDefinition<T>(definition: ConnectorDefinition<T>): Connector<T>;
    readonly source: Observable<Observable<T>>;
    readonly target: Observable<Observable<T>>;
    private _sourceValueHandle;
    private constructor();
    initManagedObject(): void;
    private updateTarget;
}
