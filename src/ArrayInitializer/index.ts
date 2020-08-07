import { ManagedObject } from "../ManagedObject";
import { Handle } from "../Handle";
import { ObservableArray } from "../ObservableArray";

export type ArrayInitializerCallback<TI, TO> = (
  value: TI,
  index: number,
  currentObject?: TO
) => TO | undefined;

export interface ArrayInitializerDefinition<TI, TO> {
  input: ObservableArray<TI>;
  callback: ArrayInitializerCallback<TI, TO>;
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

  private _input: ObservableArray<TI>;
  private _callback: ArrayInitializerCallback<TI, TO>;
  private _previousInput: TI[] = [];
  private _objects: TO[] = [];

  private constructor(definition: ArrayInitializerDefinition<TI, TO>) {
    super();

    this._input = definition.input;
    this._callback = definition.callback;
  }

  initManagedObject() {
    this.addHandle(
      this._input.didChange.subscribe(() => {
        const newInput = this._input.toValues();

        if (newInput == null) {
          return;
        }

        for (let i = 0; i < newInput.length; i++) {
          if (this._previousInput[i] !== newInput[i]) {
            const newValue = newInput[i];
            const previousObject = this._objects[i];

            const newObject = this._callback(newValue, i, previousObject);

            if (newObject != null) {
              this._objects[i] = newObject;
            } else {
              delete this._objects[i];
            }

            if (previousObject !== newObject) {
              if (previousObject != null) {
                this.removeManagedObject(previousObject);
              }

              if (newObject != null) {
                this.addManagedObject(newObject);
              }
            }
          }
        }

        if (this._previousInput.length > newInput.length) {
          for (let i = newInput.length; i < this._previousInput.length; i++) {
            const object = this._objects[i];
            if (object != null) {
              this.removeManagedObject(object);
            }
          }

          this._objects.splice(
            newInput.length,
            this._previousInput.length - newInput.length
          );
        }

        this._previousInput = newInput;
      }, true)
    );

    this.addHandle(
      Handle.givenCallback(() => {
        this._objects = [];
      })
    );
  }

  toManagedObjects(): TO[] {
    return [...this._objects];
  }
}
