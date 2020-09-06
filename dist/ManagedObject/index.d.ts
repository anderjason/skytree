import { Receipt, ReadOnlyObservable, ReadOnlyObservableArray, ReadOnlyObservableSet } from "@anderjason/observable";
export declare class ManagedObject {
    private static _initializedSet;
    static readonly initializedSet: ReadOnlyObservableSet<ManagedObject>;
    readonly id: string;
    private _receipts;
    readonly receipts: ReadOnlyObservableSet<Receipt>;
    private _parentObject;
    readonly parentObject: ReadOnlyObservable<ManagedObject>;
    private _thisReceipt;
    private _childObjects;
    readonly childObjects: ReadOnlyObservableArray<ManagedObject>;
    private _isInitialized;
    readonly isInitialized: ReadOnlyObservable<boolean>;
    constructor();
    init(): Receipt;
    uninit(): void;
    addManagedObject<T extends ManagedObject>(childObject: T): T;
    addReceipt(receipt: Receipt): Receipt;
    removeManagedObject(child: ManagedObject): void;
    removeReceipt(receipt: Receipt): void;
    protected initManagedObject(): void;
}
