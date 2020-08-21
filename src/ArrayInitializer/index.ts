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

  readonly objects = ObservableArray.ofEmpty<TO>();

  private _input: ObservableArray<TI>;
  private _callback: ArrayInitializerCallback<TI, TO>;
  private _previousInput: TI[] = [];

  private constructor(definition: ArrayInitializerDefinition<TI, TO>) {
    super();

    this._input = definition.input;
    this._callback = definition.fn;
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
            const previousObject = this.objects.toOptionalValueGivenIndex(i);

            const newObject = this._callback(newValue, i, previousObject);
            this.objects.replaceValueAtIndex(i, newObject);

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
            const object = this.objects.toOptionalValueGivenIndex(i);
            if (object != null) {
              this.removeManagedObject(object);
            }
          }

          console.log(
            "before",
            newInput.length,
            this.objects.toValues().map((o: any) => o.testValue)
          );
          this.objects.removeAllWhere((v, i) => {
            const remove = i >= newInput.length;
            console.log("remove", (v as any).testValue, remove);
            return remove;
          });
          console.log(
            "after",
            this.objects.toValues().map((o: any) => o.testValue)
          );
        }

        this._previousInput = newInput;
      }, true)
    );

    this.addHandle(
      Handle.givenCallback(() => {
        this.objects.clear();
      })
    );
  }
}
