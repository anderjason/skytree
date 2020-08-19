import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
export interface TransformerDefinition<TI, TO> {
    input: Observable<TI>;
    converter: (value: TI) => TO | Promise<TO>;
    output?: Observable<TO>;
}
export declare class Transformer<TI, TO> extends ManagedObject {
    readonly input: Observable<TI>;
    readonly output: Observable<TO>;
    private _converter;
    static givenDefinition<TI, TO>(definition: TransformerDefinition<TI, TO>): Transformer<TI, TO>;
    private constructor();
    initManagedObject(): void;
}
