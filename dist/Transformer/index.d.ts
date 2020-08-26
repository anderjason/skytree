import { ManagedObject } from "../ManagedObject";
import { Observable, ObservableBase } from "../Observable";
export interface TransformerDefinition<TI, TO> {
    input: ObservableBase<TI>;
    fn: (value: TI) => TO | Promise<TO>;
    output?: Observable<TO>;
}
export declare class Transformer<TI, TO> extends ManagedObject {
    readonly input: ObservableBase<TI>;
    readonly output: ObservableBase<TO>;
    private _converter;
    private _output;
    static givenDefinition<TI, TO>(definition: TransformerDefinition<TI, TO>): Transformer<TI, TO>;
    private constructor();
    initManagedObject(): void;
}
