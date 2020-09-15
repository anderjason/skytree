import {
  Observable,
  ObservableBase,
  ReadOnlyObservable,
} from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";

export interface ConditionalInitializerProps<TI, TO> {
  input: ObservableBase<TI>;
  fn: (input: TI) => boolean;
  instance: TO;
}

export class ConditionalInitializer<
  TI,
  TO extends ManagedObject
> extends ManagedObject<ConditionalInitializerProps<TI, TO>> {
  private _output = Observable.ofEmpty<TO>();
  readonly output = ReadOnlyObservable.givenObservable(this._output);

  onActivate() {
    this.cancelOnDeactivate(
      this.props.input.didChange.subscribe((input) => {
        const isActive = this.props.fn(input);

        if (isActive) {
          if (this._output.value == null) {
            this._output.setValue(this.addManagedObject(this.props.instance));
          }
        } else {
          if (this._output.value != null) {
            this.removeManagedObject(this._output.value);
            this._output.setValue(undefined);
          }
        }
      }, true)
    );
  }
}
