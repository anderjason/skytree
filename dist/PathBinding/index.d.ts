import { Observable } from "../Observable";
import { ValuePath } from "../ValuePath";
import { ManagedObject } from "../ManagedObject";
export interface PathBindingDefinition {
    input: any;
    path: ValuePath;
    output?: Observable<unknown>;
}
export declare class PathBinding extends ManagedObject {
    static givenDefinition(definition: PathBindingDefinition): PathBinding;
    readonly output: Observable<unknown>;
    private _input;
    private _path;
    private _pathHandles;
    private constructor();
    initManagedObject(): void;
    private clearPathHandles;
    private rebuild;
}