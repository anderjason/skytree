import { ManagedObject } from "../ManagedObject";
import { Handle } from "../Handle";
import { Observable } from "../Observable";

export type ExclusiveInitializerCallback<T> = (
  newValue: T,
  oldValue: T,
  currentObject?: ManagedObject
) => ManagedObject | undefined;

export interface ExclusiveInitializerDefinition<T> {
  input: Observable<T>;
  fn: ExclusiveInitializerCallback<T>;
}

export class ExclusiveInitializer<T> extends ManagedObject {
  static givenDefinition<T>(
    definition: ExclusiveInitializerDefinition<T>
  ): ExclusiveInitializer<T> {
    return new ExclusiveInitializer(definition);
  }

  private _input: Observable<T>;
  private _callback: ExclusiveInitializerCallback<T>;
  private _object: ManagedObject;

  private constructor(definition: ExclusiveInitializerDefinition<T>) {
    super();

    this._input = definition.input;
    this._callback = definition.fn;
  }

  initManagedObject() {
    if (this._input != null && this._callback != null) {
      this.addHandle(
        this._input.didChange.subscribe((newValue: any, oldValue: any) => {
          const newObject = this._callback(newValue, oldValue, this._object);

          if (newObject === this._object) {
            return;
          }

          if (this._object != null) {
            this.removeManagedObject(this._object);
            this._object = undefined;
          }

          if (newObject != null) {
            this._object = this.addManagedObject(newObject);
          }
        }, true)
      );
    }

    this.addHandle(
      Handle.givenCallback(() => {
        this._object = undefined;
      })
    );
  }
}
