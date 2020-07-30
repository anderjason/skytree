import { ManagedObject } from "../ManagedObject";
import { SimpleEvent } from "../SimpleEvent";
export declare type ExclusiveInitializerCallback<T> = (newValue: T, oldValue: T, currentObject?: ManagedObject) => ManagedObject | undefined;
export interface ExclusiveInitializerDefinition<T> {
    input: SimpleEvent<T>;
    callback: ExclusiveInitializerCallback<T>;
}
export declare class ExclusiveInitializer<T> extends ManagedObject {
    static givenDefinition<T>(definition: ExclusiveInitializerDefinition<T>): ExclusiveInitializer<T>;
    private _input;
    private _callback;
    private _object;
    private constructor();
    initManagedObject(): void;
}
