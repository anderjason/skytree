import {
  Receipt,
  ObservableArray,
  ObservableArrayBase,
  ReadOnlyObservableArray,
} from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";

export type ArrayInitializerCallback<TI, TO> = (
  value: TI,
  index: number,
  currentObject?: TO
) => TO | undefined;

export interface ArrayInitializerProps<TI, TO> {
  input: ObservableArrayBase<TI>;
  fn: ArrayInitializerCallback<TI, TO>;
}

export class ArrayInitializer<
  TI,
  TO extends ManagedObject
> extends ManagedObject<ArrayInitializerProps<TI, TO>> {
  private _output = ObservableArray.ofEmpty<TO>();
  readonly output = ReadOnlyObservableArray.givenObservableArray(this._output);

  private _previousInput: TI[] = [];

  onActivate() {
    this.cancelOnDeactivate(
      this.props.input.didChange.subscribe(() => {
        const newInput = this.props.input.toValues();

        if (newInput == null) {
          return;
        }

        for (let i = 0; i < newInput.length; i++) {
          if (this._previousInput[i] !== newInput[i]) {
            const newValue = newInput[i];
            const previousObject = this._output.toOptionalValueGivenIndex(i);

            const newObject = this.props.fn(newValue, i, previousObject);

            if (previousObject !== newObject) {
              if (previousObject != null) {
                this.removeManagedObject(previousObject);
              }

              if (newObject != null) {
                this.addManagedObject(newObject);
              }
            }

            // this needs to happen after adding the new object above,
            // so the object is initialized by the time this observable updates
            this._output.replaceValueAtIndex(i, newObject);
          }
        }

        if (this._previousInput.length > newInput.length) {
          for (let i = newInput.length; i < this._previousInput.length; i++) {
            const object = this._output.toOptionalValueGivenIndex(i);
            if (object != null) {
              this.removeManagedObject(object);
            }
          }

          this._output.removeAllWhere((v, i) => i >= newInput.length);
        }

        this._previousInput = newInput;
      }, true)
    );

    this.cancelOnDeactivate(
      new Receipt(() => {
        this._output.clear();
      })
    );
  }
}
