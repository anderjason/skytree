import { Handle } from "../Handle";
import { Observable } from "../Observable";
export declare class ManagedObject {
    static readonly initializedCount: Observable<number>;
    readonly id: string;
    private _handles;
    private _thisHandle;
    private _parent?;
    private _children;
    constructor();
    get isInitialized(): boolean;
    get parent(): ManagedObject | undefined;
    get children(): ManagedObject[];
    init: () => Handle;
    uninit: () => void;
    addManagedObject: <T extends ManagedObject>(child: T) => T;
    addHandle: (handle: Handle) => Handle;
    removeManagedObject: (child: ManagedObject) => void;
    protected initManagedObject(): void;
}
