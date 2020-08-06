import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";

export interface BooleanInitializerDefinition<TO> {
  input: Observable<boolean>;
  instance: TO;
}

export interface BooleanInitializerConditionalDefinition<TI, TO> {
  input: Observable<TI>;
  isActive: (input: TI) => boolean;
  instance: TO;
}

export class BooleanInitializer<
  TO extends ManagedObject
> extends ManagedObject {
  static givenDefinition<TO extends ManagedObject>(
    definition: BooleanInitializerDefinition<TO>
  ): BooleanInitializer<TO> {
    return new BooleanInitializer(definition);
  }

  static givenCondition<TI, TO extends ManagedObject>(
    definition: BooleanInitializerConditionalDefinition<TI, TO>
  ): BooleanInitializer<TO> {
    const isActive = Observable.ofEmpty<boolean>(Observable.isStrictEqual);

    const handle = definition.input.didChange.subscribe((input) => {
      isActive.setValue(definition.isActive(input));
    }, true);

    const result = new BooleanInitializer({
      input: isActive,
      instance: definition.instance,
    });

    result.addHandle(handle);

    return result;
  }

  private _input: Observable<boolean>;
  private _instance: TO;
  private _activeInstance: TO;

  private constructor(definition: BooleanInitializerDefinition<TO>) {
    super();

    this._input = definition.input;
    this._instance = definition.instance;
  }

  get instance(): TO | undefined {
    return this._activeInstance;
  }

  initManagedObject() {
    this.addHandle(
      this._input.didChange.subscribe((isActive) => {
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
