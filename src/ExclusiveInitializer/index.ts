import {
  Receipt,
  Observable,
  ObservableBase,
  ReadOnlyObservable,
} from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";

export type ExclusiveInitializerCallback<T> = (
  newValue: T,
  oldValue: T,
  currentObject?: ManagedObject
) => ManagedObject | undefined;

export interface ExclusiveInitializerProps<T> {
  input: ObservableBase<T>;
  fn: ExclusiveInitializerCallback<T>;
}

export class ExclusiveInitializer<T> extends ManagedObject<
  ExclusiveInitializerProps<T>
> {
  private _output = Observable.ofEmpty<ManagedObject>(Observable.isStrictEqual);
  readonly output = ReadOnlyObservable.givenObservable(this._output);

  onActivate() {
    if (this.props.input != null && this.props.fn != null) {
      this.cancelOnDeactivate(
        this.props.input.didChange.subscribe((newValue: any, oldValue: any) => {
          const newObject = this.props.fn(
            newValue,
            oldValue,
            this._output.value
          );

          if (newObject === this._output.value) {
            return;
          }

          if (this._output.value != null) {
            this.removeManagedObject(this._output.value);
            this._output.setValue(undefined);
          }

          if (newObject != null) {
            this._output.setValue(this.addManagedObject(newObject));
          }
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
