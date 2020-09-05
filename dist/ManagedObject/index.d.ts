import { Handle, ReadOnlyObservable, ReadOnlyObservableArray, ReadOnlyObservableSet } from "@anderjason/observable";
export declare class ManagedObject {
    private static _initializedSet;
    static readonly initializedSet: ReadOnlyObservableSet<ManagedObject>;
    readonly id: string;
    private _handles;
    readonly handles: ReadOnlyObservableSet<Handle>;
    private _parentObject;
    readonly parentObject: ReadOnlyObservable<ManagedObject>;
    private _thisHandle;
    private _childObjects;
    readonly childObjects: ReadOnlyObservableArray<ManagedObject>;
    private _isInitialized;
    readonly isInitialized: ReadOnlyObservable<boolean>;
    constructor();
    init(): Handle;
    uninit(): void;
    addManagedObject<T extends ManagedObject>(childObject: T): T;
    addHandle(handle: Handle): Handle;
    removeManagedObject(child: ManagedObject): void;
    removeHandle(handle: Handle): void;
    protected initManagedObject(): void;
}
