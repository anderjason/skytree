import { ObservableBase, TypedEvent } from "@anderjason/observable";
import { Actor } from "../Actor";
export declare type MultiBindingGroup = ObservableBase<any>[];
export declare type MultiBindingInput = ObservableBase<any> | TypedEvent<any>;
export interface MultiBindingProps {
    inputs: MultiBindingInput[];
}
export declare class MultiBinding extends Actor<MultiBindingProps> {
    readonly didInvalidate: TypedEvent<void>;
    onActivate(): void;
}
