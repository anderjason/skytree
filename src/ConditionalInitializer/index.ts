import {
  Observable,
  ObservableBase,
  ReadOnlyObservable,
} from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";

export interface ConditionalInitializerDefinition<TI, TO> {
  input: ObservableBase<TI>;
  fn: (input: TI) => boolean;
  instance: TO;
}

export class ConditionalInitializer<
  TI,
  TO extends ManagedObject
> extends ManagedObject {
  static givenDefinition<TI, TO extends ManagedObject>(
    definition: ConditionalInitializerDefinition<TI, TO>
  ): ConditionalInitializer<TI, TO> {
    return new ConditionalInitializer(definition);
  }

  private _output = Observable.ofEmpty<TO>();
  readonly output = ReadOnlyObservable.givenObservable(this._output);

  private _input: ObservableBase<TI>;
  private _shouldInitialize: (input: TI) => boolean;
  private _instance: TO;

  private constructor(definition: ConditionalInitializerDefinition<TI, TO>) {
    super();

    this._input = definition.input;
    this._shouldInitialize = definition.fn;
    this._instance = definition.instance;
  }

  initManagedObject() {
    this.addReceipt(
      this._input.didChange.subscribe((input) => {
        const isActive = this._shouldInitialize(input);

        if (isActive) {
          if (this._output.value == null) {
            this._output.setValue(this.addManagedObject(this._instance));
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
