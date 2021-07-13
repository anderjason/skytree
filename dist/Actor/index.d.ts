import { Receipt } from "@anderjason/observable";
export declare class Actor<T = any> {
    private _receipts;
    private _parentObject;
    private _thisReceipt;
    private _childObjects;
    private _isActive;
    private _props;
    get isActive(): boolean;
    get parentObject(): Actor;
    get childObjects(): Iterable<Actor>;
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
