import { Observable, ReadOnlyObservable } from "@anderjason/observable";
import { ValuePath } from "@anderjason/util";
import { ManagedObject } from "../ManagedObject";
export interface PathBindingDefinition {
    input: any;
    path: ValuePath;
    output?: Observable<unknown>;
}
export declare class PathBinding extends ManagedObject {
    static givenDefinition(definition: PathBindingDefinition): PathBinding;
    private _output;
    readonly output: ReadOnlyObservable<unknown>;
    readonly path: ValuePath;
    private _matchedPath;
    readonly matchedPath: ReadOnlyObservable<ValuePath>;
    private _isMatched;
    readonly isMatched: ReadOnlyObservable<boolean>;
    private _input;
    private _pathReceipts;
    private _currentBuildId;
    private constructor();
    initManagedObject(): void;
    private clearPathReceipts;
    private rebuild;
}
