import { Actor } from "../Actor";
import { Observable, ObservableBase } from "@anderjason/observable";
export interface ConvertBindingProps<TI, TO> {
    input: ObservableBase<TI>;
    fn: (value: TI) => TO | Promise<TO>;
    output?: Observable<TO>;
}
export declare class ConvertBinding<TI, TO> extends Actor<ConvertBindingProps<TI, TO>> {
    private _output;
    readonly output: ObservableBase<TO>;
    constructor(props: ConvertBindingProps<TI, TO>);
    onActivate(): void;
}
