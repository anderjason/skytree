import { Receipt, ReadOnlyObservable, ReadOnlyObservableArray, ReadOnlyObservableSet } from "@anderjason/observable";
export declare class ManagedObject<T = any> {
    private static _activeSet;
    static readonly activeSet: ReadOnlyObservableSet<ManagedObject<any>>;
    readonly managedObjectId: string;
    private _receipts;
    readonly receipts: ReadOnlyObservableSet<Receipt>;
    private _parentObject;
    readonly parentObject: ReadOnlyObservable<ManagedObject<any>>;
    private _thisReceipt;
    private _childObjects;
    readonly childObjects: ReadOnlyObservableArray<ManagedObject<any>>;
    private _isActive;
    readonly isActive: ReadOnlyObservable<boolean>;
    private _props;
    constructor(props: T);
    get props(): T;
    activate(): Receipt;
    deactivate(): void;
    addManagedObject<T extends ManagedObject>(childObject: T): T;
    cancelOnDeactivate(receipt: Receipt): Receipt;
    removeCancelOnDeactivate(receipt: Receipt): void;
    removeManagedObject(child: ManagedObject): void;
    protected onActivate(): void;
}
