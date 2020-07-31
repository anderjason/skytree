import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";

export interface BooleanInitializerDefinition {
  input: Observable<boolean>;
  instance: ManagedObject;
}

export class BooleanInitializer extends ManagedObject {
  static givenDefinition(
    definition: BooleanInitializerDefinition
  ): BooleanInitializer {
    return new BooleanInitializer(definition);
  }

  private _input: Observable<boolean>;
  private _instance: ManagedObject;
  private _activeInstance: ManagedObject;

  private constructor(definition: BooleanInitializerDefinition) {
    super();

    this._input = definition.input;
    this._instance = definition.instance;
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
