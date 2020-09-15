import { ManagedObject } from "../ManagedObject";
import { Observable, ObservableBase } from "@anderjason/observable";
export interface TransformerProps<TI, TO> {
    input: ObservableBase<TI>;
    fn: (value: TI) => TO | Promise<TO>;
    output?: Observable<TO>;
}
export declare class Transformer<TI, TO> extends ManagedObject<TransformerProps<TI, TO>> {
    readonly output: ObservableBase<TO>;
    private _output;
    constructor(props: TransformerProps<TI, TO>);
    onActivate(): void;
}
