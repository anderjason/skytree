import { ObservableBase, ReadOnlyObservable } from "@anderjason/observable";
import { Actor } from "../Actor";
export interface ConditionalActivatorProps<TI, TO> {
    input: ObservableBase<TI>;
    fn: (input: TI) => boolean;
    actor: TO;
}
export declare class ConditionalActivator<TI, TO extends Actor> extends Actor<ConditionalActivatorProps<TI, TO>> {
    private _output;
    readonly output: ReadOnlyObservable<TO>;
    onActivate(): void;
}
