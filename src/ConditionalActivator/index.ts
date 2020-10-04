import {
  Observable,
  ObservableBase,
  ReadOnlyObservable,
} from "@anderjason/observable";
import { Actor } from "../Actor";

export interface ConditionalActivatorProps<TI, TO> {
  input: ObservableBase<TI>;
  fn: (input: TI) => boolean;
  actor: TO;
}

export class ConditionalActivator<TI, TO extends Actor> extends Actor<
  ConditionalActivatorProps<TI, TO>
> {
  private _output = Observable.ofEmpty<TO>();
  readonly output = ReadOnlyObservable.givenObservable(this._output);

  onActivate() {
    this.cancelOnDeactivate(
      this.props.input.didChange.subscribe((input) => {
        const isActive = this.props.fn(input);

        if (isActive) {
          if (this._output.value == null) {
            this._output.setValue(this.addActor(this.props.actor));
          }
        } else {
          if (this._output.value != null) {
            this.removeActor(this._output.value);
            this._output.setValue(undefined);
          }
        }
      }, true)
    );
  }
}
