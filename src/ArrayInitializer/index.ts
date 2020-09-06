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

export interface ArrayInitializerDefinition<TI, TO> {
  input: ObservableArrayBase<TI>;
  fn: ArrayInitializerCallback<TI, TO>;
}

export class ArrayInitializer<
  TI,
  TO extends ManagedObject
> extends ManagedObject {
  static givenDefinition<TI, TO extends ManagedObject>(
    definition: ArrayInitializerDefinition<TI, TO>
  ): ArrayInitializer<TI, TO> {
    return new ArrayInitializer(definition);
  }

  private _objects = ObservableArray.ofEmpty<TO>();
  readonly objects = ReadOnlyObservableArray.givenObservableArray(
    this._objects
  );

  private _input: ObservableArrayBase<TI>;
  private _callback: ArrayInitializerCallback<TI, TO>;
  private _previousInput: TI[] = [];

  private constructor(definition: ArrayInitializerDefinition<TI, TO>) {
    super();

    this._input = definition.input;
    this._callback = definition.fn;
  }

  initManagedObject() {
    this.addReceipt(
      this._input.didChange.subscribe(() => {
        const newInput = this._input.toValues();

        if (newInput == null) {
          return;
        }

        for (let i = 0; i < newInput.length; i++) {
          if (this._previousInput[i] !== newInput[i]) {
            const newValue = newInput[i];
            const previousObject = this._objects.toOptionalValueGivenIndex(i);

            const newObject = this._callback(newValue, i, previousObject);

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
            this._objects.replaceValueAtIndex(i, newObject);
          }
        }

        if (this._previousInput.length > newInput.length) {
          for (let i = newInput.length; i < this._previousInput.length; i++) {
            const object = this._objects.toOptionalValueGivenIndex(i);
            if (object != null) {
              this.removeManagedObject(object);
            }
          }

          this._objects.removeAllWhere((v, i) => i >= newInput.length);
        }

        this._previousInput = newInput;
      }, true)
    );

    this.addReceipt(
      Receipt.givenCancelFunction(() => {
        this._objects.clear();
      })
    );
  }
}
