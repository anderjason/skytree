import {
  Observable,
  ObservableBase,
  ReadOnlyObservable,
} from "@anderjason/observable";
import { Actor } from "../Actor";

export interface ConditionalActivatorProps<TI, TO> {
  input: ObservableBase<TI>;
  fn: (input: TI) => boolean;
  actor: TO | (() => TO);
}

export class ConditionalActivator<TI, TO extends Actor> extends Actor<
  ConditionalActivatorProps<TI, TO>
> {
  private _output = Observable.ofEmpty<TO>();
  readonly output = ReadOnlyObservable.givenObservable(this._output);

  onActivate() {
    const isActive = Observable.ofEmpty<boolean>(Observable.isStrictEqual);

    this.cancelOnDeactivate(
      this.props.input.didChange.subscribe((input) => {
        isActive.setValue(this.props.fn(input));
      }, true)
    );

    this.cancelOnDeactivate(
      isActive.didChange.subscribe((value) => {
        if (this._output.value != null) {
          this.removeActor(this._output.value);
          this._output.setValue(undefined);
        }

        if (value == true) {
          let newActor: TO;
          if (typeof this.props.actor === "function") {
            newActor = this.props.actor();
          } else {
            newActor = this.props.actor;
          }

          this._output.setValue(this.addActor(newActor));
        }
      }, true)
    );
  }
}
