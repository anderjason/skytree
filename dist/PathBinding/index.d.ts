import { Observable, ObservableBase, ReadOnlyObservable } from "@anderjason/observable";
import { ValuePath } from "@anderjason/util";
import { Actor } from "../Actor";
export interface PathBindingProps<TI, TO> {
    input: ObservableBase<TI>;
    path: ValuePath;
    output?: Observable<TO>;
}
export declare class PathBinding<TI, TO = unknown> extends Actor<PathBindingProps<TI, TO>> {
    private static bindingGroupsByInput;
    static refreshAllHavingInput(input: unknown): void;
    private _output;
    readonly output: ReadOnlyObservable<TO>;
    constructor(props: PathBindingProps<TI, TO>);
    onActivate(): void;
    refresh(): void;
}
