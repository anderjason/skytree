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

  private _input: Observable<TI>;
  private _shouldInitialize: (input: TI) => boolean;
  private _instance: TO;
  private _activeInstance: TO;

  private constructor(definition: ConditionalInitializerDefinition<TI, TO>) {
    super();

    this._input = definition.input;
    this._shouldInitialize = definition.fn;
    this._instance = definition.instance;
  }

  get instance(): TO | undefined {
    return this._activeInstance;
  }

  initManagedObject() {
    this.addHandle(
      this._input.didChange.subscribe((input) => {
        const isActive = this._shouldInitialize(input);

        if (isActive) {
          if (this._activeInstance == null) {
            this._activeInstance = this.addManagedObject(this._instance);
          }
        } else {
          if (this._activeInstance != null) {
            this.removeManagedObject(this._activeInstance);
            this._activeInstance = undefined;
          }
        }
      }, true)
    );
  }
}
