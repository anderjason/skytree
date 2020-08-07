import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
export interface ConditionalInitializerDefinition<TI, TO> {
    input: Observable<TI>;
    shouldInitialize: (input: TI) => boolean;
    instance: TO;
}
export declare class ConditionalInitializer<TI, TO extends ManagedObject> extends ManagedObject {
    static givenDefinition<TI, TO extends ManagedObject>(definition: ConditionalInitializerDefinition<TI, TO>): ConditionalInitializer<TI, TO>;
    private _input;
    private _shouldInitialize;
    private _instance;
    private _activeInstance;
    private constructor();
    get instance(): TO | undefined;
    initManagedObject(): void;
}
