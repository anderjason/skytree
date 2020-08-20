import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
export declare type ExclusiveInitializerCallback<T> = (newValue: T, oldValue: T, currentObject?: ManagedObject) => ManagedObject | undefined;
export interface ExclusiveInitializerDefinition<T> {
    input: Observable<T>;
    fn: ExclusiveInitializerCallback<T>;
}
export declare class ExclusiveInitializer<T> extends ManagedObject {
    static givenDefinition<T>(definition: ExclusiveInitializerDefinition<T>): ExclusiveInitializer<T>;
    readonly object: Observable<ManagedObject>;
    private _input;
    private _callback;
    private constructor();
    initManagedObject(): void;
}
