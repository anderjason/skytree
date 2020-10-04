import { Receipt, ReadOnlyObservable, ReadOnlyObservableArray, ReadOnlyObservableSet } from "@anderjason/observable";
export declare class Actor<T = any> {
    private static _activeSet;
    static readonly activeSet: ReadOnlyObservableSet<Actor<any>>;
    readonly managedObjectId: string;
    private _receipts;
    readonly receipts: ReadOnlyObservableSet<Receipt>;
    private _parentObject;
    readonly parentObject: ReadOnlyObservable<Actor<any>>;
    private _thisReceipt;
    private _childObjects;
    readonly childObjects: ReadOnlyObservableArray<Actor<any>>;
    private _isActive;
    readonly isActive: ReadOnlyObservable<boolean>;
    private _props;
    constructor(props: T);
    get props(): T;
    activate(): Receipt;
    deactivate(): void;
    addActor<T extends Actor>(childObject: T): T;
    cancelOnDeactivate(receipt: Receipt): Receipt;
    removeCancelOnDeactivate(receipt: Receipt): void;
    removeActor(child: Actor): void;
    protected onActivate(): void;
}
