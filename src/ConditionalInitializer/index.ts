import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";

export interface ConditionalInitializerDefinition<TI, TO> {
  input: Observable<TI>;
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

  readonly output = Observable.ofEmpty<TO>();

  private _input: Observable<TI>;
  private _shouldInitialize: (input: TI) => boolean;
  private _instance: TO;

  private constructor(definition: ConditionalInitializerDefinition<TI, TO>) {
    super();

    this._input = definition.input;
    this._shouldInitialize = definition.fn;
    this._instance = definition.instance;
  }

  initManagedObject() {
    this.addHandle(
      this._input.didChange.subscribe((input) => {
        const isActive = this._shouldInitialize(input);

        if (isActive) {
          if (this.output.value == null) {
            this.output.setValue(this.addManagedObject(this._instance));
          }
        } else {
          if (this.output.value != null) {
            this.removeManagedObject(this.output.value);
            this.output.setValue(undefined);
          }
        }
      }, true)
    );
  }
}
