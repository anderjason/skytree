import { Observable, ObservableBase, TypedEvent } from "@anderjason/observable";
import { Actor } from "../Actor";

export type MultiBindingGroup = ObservableBase<any>[];

export type MultiBindingInput = ObservableBase<any> | TypedEvent<any>;

export interface MultiBindingProps {
  inputs: MultiBindingInput[];
}

export class MultiBinding extends Actor<MultiBindingProps> {
  readonly didInvalidate = new TypedEvent();

  onActivate() {
    this.props.inputs.forEach((input) => {
      const event = Observable.isObservable(input) ? input.didChange : input;

      this.cancelOnDeactivate(
        event.subscribe(() => {
          this.didInvalidate.emit();
        })
      );
    });
  }
}
