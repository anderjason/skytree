import { Handle } from "../Handle";
export declare abstract class ManagedObject {
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
    addChild: <T extends ManagedObject>(child: T) => T;
    addHandle: (handle: Handle) => Handle;
    removeChild: (child: ManagedObject) => void;
    protected abstract initManagedObject(): void;
}
