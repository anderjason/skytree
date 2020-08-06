import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
export interface BooleanInitializerDefinition<TO> {
    input: Observable<boolean>;
    instance: TO;
}
export interface BooleanInitializerConditionalDefinition<TI, TO> {
    input: Observable<TI>;
    isActive: (input: TI) => boolean;
    instance: TO;
}
export declare class BooleanInitializer<TO extends ManagedObject> extends ManagedObject {
    static givenDefinition<TO extends ManagedObject>(definition: BooleanInitializerDefinition<TO>): BooleanInitializer<TO>;
    static givenCondition<TI, TO extends ManagedObject>(definition: BooleanInitializerConditionalDefinition<TI, TO>): BooleanInitializer<TO>;
    private _input;
    private _instance;
    private _activeInstance;
    private constructor();
    get instance(): TO | undefined;
    initManagedObject(): void;
}
