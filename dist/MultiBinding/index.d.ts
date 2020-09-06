import { ObservableBase, TypedEvent } from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";
export declare type MultiBindingGroup = ObservableBase<any>[];
export declare class MultiBinding extends ManagedObject {
    static givenGroups(groups: MultiBindingGroup[]): MultiBinding;
    static givenOneGroup(group: MultiBindingGroup): MultiBinding;
    static givenAnyChange(inputs: ObservableBase<any>[]): MultiBinding;
    readonly didInvalidate: TypedEvent<void>;
    private _groups;
    private _willInvalidateLater;
    private _invalidatedSetByGroup;
    private constructor();
    initManagedObject(): void;
    private isAnyGroupInvalidated;
    private onChange;
    private invalidateNow;
}
