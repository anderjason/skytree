import { ManagedObject } from "../ManagedObject";
import { ObservableBase } from "../Observable";
import { SimpleEvent } from "../SimpleEvent";
export declare type MultiBindingGroup = ObservableBase<any>[];
export declare class MultiBinding extends ManagedObject {
    static givenGroups(groups: MultiBindingGroup[]): MultiBinding;
    static givenOneGroup(group: MultiBindingGroup): MultiBinding;
    static givenAnyChange(inputs: ObservableBase<any>[]): MultiBinding;
    readonly didInvalidate: SimpleEvent<void>;
    private _groups;
    private _willInvalidateLater;
    private _invalidatedSetByGroup;
    private constructor();
    initManagedObject(): void;
    private isAnyGroupInvalidated;
    private onChange;
    private invalidateNow;
}
