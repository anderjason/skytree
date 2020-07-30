import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
export interface BooleanInitializerDefinition {
    input: Observable<boolean>;
    instance: ManagedObject;
}
export declare class BooleanInitializer extends ManagedObject {
    static givenDefinition(definition: BooleanInitializerDefinition): BooleanInitializer;
    private _input;
    private _instance;
    private _activeInstance;
    private constructor();
    initManagedObject(): void;
}
