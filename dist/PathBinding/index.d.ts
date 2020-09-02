import { Observable } from "../Observable";
import { ValuePath } from "../ValuePath";
import { ManagedObject } from "../ManagedObject";
import { ReadOnlyObservable } from "../ReadOnlyObservable";
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
    private _input;
    private _pathHandles;
    private _currentBuildId;
    private _matchedPath;
    private constructor();
    get matchedPath(): ValuePath;
    initManagedObject(): void;
    private clearPathHandles;
    private rebuild;
}
