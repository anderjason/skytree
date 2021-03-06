import { ObservableBase, TypedEvent } from "@anderjason/observable";
import { Actor } from "../Actor";
export declare type MultiBindingGroup = ObservableBase<any>[];
export interface MultiBindingProps {
    groups: MultiBindingGroup[];
}
export declare class MultiBinding extends Actor<MultiBindingProps> {
    static givenGroups(groups: MultiBindingGroup[]): MultiBinding;
    static givenOneGroup(group: MultiBindingGroup): MultiBinding;
    static givenAnyChange(inputs: ObservableBase<any>[]): MultiBinding;
    readonly didInvalidate: TypedEvent<void>;
    private _willInvalidateLater;
    private _invalidatedSetByGroup;
    onActivate(): void;
    private isAnyGroupInvalidated;
    private onChange;
    private invalidateNow;
}
