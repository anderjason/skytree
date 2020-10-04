import {
  Receipt,
  Observable,
  ObservableBase,
  ReadOnlyObservable,
} from "@anderjason/observable";
import { Actor } from "../Actor";

export type ExclusiveActivatorCallback<T> = (
  newValue: T,
  oldValue: T,
  currentObject?: Actor
) => Actor | undefined;

export interface ExclusiveActivatorProps<T> {
  input: ObservableBase<T>;
  fn: ExclusiveActivatorCallback<T>;
}

export class ExclusiveActivator<T> extends Actor<ExclusiveActivatorProps<T>> {
  private _output = Observable.ofEmpty<Actor>(Observable.isStrictEqual);
  readonly output = ReadOnlyObservable.givenObservable(this._output);

  private _lastObject: Actor;

  onActivate() {
    if (this.props.input != null && this.props.fn != null) {
      this.cancelOnDeactivate(
        this.props.input.didChange.subscribe((newValue: any, oldValue: any) => {
          const newObject = this.props.fn(
            newValue,
            oldValue,
            this._output.value
          );

          if (newObject === this._lastObject) {
            return;
          }

          if (this._lastObject != null) {
            this.removeActor(this._lastObject);
            this._lastObject = undefined;
          }

          if (newObject != null) {
            this._lastObject = newObject;
            this.addActor(newObject);
          }

          this._output.setValue(this._lastObject);
        }, true)
      );
    }

    this.cancelOnDeactivate(
      new Receipt(() => {
        this._output.setValue(undefined);
      })
    );
  }
}
