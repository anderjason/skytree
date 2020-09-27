import { Observable, ObservableBase, ReadOnlyObservable } from "@anderjason/observable";
import { ValuePath } from "@anderjason/util";
import { ManagedObject } from "../ManagedObject";
export interface PathBindingProps<TI, TO> {
    input: ObservableBase<TI>;
    path: ValuePath;
    output?: Observable<TO>;
}
export declare class PathBinding<TI, TO = unknown> extends ManagedObject<PathBindingProps<TI, TO>> {
    private static bindingGroupsByInput;
    static refreshAllHavingInput(input: unknown): void;
    private _output;
    readonly output: ReadOnlyObservable<TO>;
    constructor(props: PathBindingProps<TI, TO>);
    onActivate(): void;
    refresh(): void;
}
