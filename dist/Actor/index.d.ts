import { Receipt } from "@anderjason/observable";
import { PropsObject } from "../PropsObject";
export declare class Actor<T = any> extends PropsObject<T> {
    protected _receipts: Set<Receipt>;
    protected _parentObject: Actor;
    protected _thisReceipt: Receipt | undefined;
    protected _childObjects: Actor[];
    protected _isActive: boolean;
    get isActive(): boolean;
    get parentObject(): Actor;
    get childObjects(): Iterable<Actor>;
    constructor(props: T);
    activate(): Receipt;
    deactivate(): void;
    addActor<T extends Actor>(childObject: T): T;
    cancelOnDeactivate(receipt: Receipt): Receipt;
    removeCancelOnDeactivate(receipt: Receipt): void;
    removeActor(child: Actor): void;
    protected onActivate(): void;
}
