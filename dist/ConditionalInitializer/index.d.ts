import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
export interface ConditionalInitializerDefinition<TI, TO> {
    input: Observable<TI>;
    fn: (input: TI) => boolean;
    instance: TO;
}
export declare class ConditionalInitializer<TI, TO extends ManagedObject> extends ManagedObject {
    static givenDefinition<TI, TO extends ManagedObject>(definition: ConditionalInitializerDefinition<TI, TO>): ConditionalInitializer<TI, TO>;
    readonly output: Observable<TO>;
    private _input;
    private _shouldInitialize;
    private _instance;
    private constructor();
    initManagedObject(): void;
}
