import { Observable, ReadOnlyObservable } from "@anderjason/observable";
import { ValuePath } from "@anderjason/util";
import { ManagedObject } from "../ManagedObject";
export interface PathBindingProps {
    input: any;
    path: ValuePath;
    output?: Observable<unknown>;
}
export declare class PathBinding extends ManagedObject<PathBindingProps> {
    private _output;
    readonly output: ReadOnlyObservable<unknown>;
    private _matchedPath;
    readonly matchedPath: ReadOnlyObservable<ValuePath>;
    private _isMatched;
    readonly isMatched: ReadOnlyObservable<boolean>;
    private _pathReceipts;
    private _currentBuildId;
    constructor(props: PathBindingProps);
    onActivate(): void;
    private clearPathReceipts;
    private rebuild;
}
