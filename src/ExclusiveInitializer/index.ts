import { ManagedObject } from "../ManagedObject";
import { Handle } from "../Handle";
import { Observable } from "../Observable";
import { ReadOnlyObservable } from "..";

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

  private _output = Observable.ofEmpty<ManagedObject>(Observable.isStrictEqual);
  readonly output = ReadOnlyObservable.givenObservable(this._output);

  private _input: Observable<T>;
  private _callback: ExclusiveInitializerCallback<T>;

  private constructor(definition: ExclusiveInitializerDefinition<T>) {
    super();

    this._input = definition.input;
    this._callback = definition.fn;
  }

  initManagedObject() {
    if (this._input != null && this._callback != null) {
      this.addHandle(
        this._input.didChange.subscribe((newValue: any, oldValue: any) => {
          const newObject = this._callback(
            newValue,
            oldValue,
            this._output.value
          );

          if (newObject === this._output.value) {
            return;
          }

          if (this._output.value != null) {
            this.removeManagedObject(this._output.value);
            this._output.setValue(undefined);
          }

          if (newObject != null) {
            this._output.setValue(this.addManagedObject(newObject));
          }
        }, true)
      );
    }

    this.addHandle(
      Handle.givenCallback(() => {
        this._output.setValue(undefined);
      })
    );
  }
}
