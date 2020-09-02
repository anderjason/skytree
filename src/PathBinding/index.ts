import { Observable } from "../Observable";
import { ValuePath } from "../ValuePath";
import { ManagedObject } from "../ManagedObject";
import { Handle } from "../Handle";
import { ObservableArray } from "../ObservableArray";
import { ObservableSet } from "../ObservableSet";
import { ObservableDict } from "../ObservableDict";
import { ReadOnlyObservable } from "../ReadOnlyObservable";

export interface PathBindingDefinition {
  input: any;
  path: ValuePath;

  output?: Observable<unknown>;
}

export class PathBinding extends ManagedObject {
  static givenDefinition(definition: PathBindingDefinition): PathBinding {
    return new PathBinding(definition);
  }

  private _output: Observable<unknown>;
  readonly output: ReadOnlyObservable<unknown>;

  private _input: any;
  private _path: ValuePath;
  private _pathHandles: Handle[] = [];

  private constructor(definition: PathBindingDefinition) {
    super();

    this._input = definition.input;
    this._path = definition.path;

    if (Observable.isObservable(definition.output)) {
      this._output = definition.output;
    } else {
      this._output = Observable.ofEmpty(Observable.isStrictEqual);
    }

    this.output = ReadOnlyObservable.givenObservable(this._output);
  }

  initManagedObject() {
    this.rebuild();

    this.addHandle(Handle.givenCallback(this.clearPathHandles));
  }

  private clearPathHandles = () => {
    this._pathHandles.forEach((handle) => {
      handle.release();
    });
    this._pathHandles = [];
  };

  private rebuild = () => {
    this.clearPathHandles();

    let index = 0;
    let parts = this._path.toParts();

    let length = parts.length;

    let object: any = this._input;

    while (object != null && index < length) {
      if (
        Observable.isObservable(object) ||
        ObservableArray.isObservableArray(object) ||
        ObservableDict.isObservableDict(object)
      ) {
        this._pathHandles.push(
          object.didChange.subscribe(() => {
            this.rebuild();
          })
        );
      }

      const nextPathPart = parts[index++];

      if (ObservableArray.isObservableArray(object)) {
        if (!Number.isInteger(nextPathPart)) {
          object = null;
        } else {
          object = object.toValues()[nextPathPart as number];
        }
      } else if (ObservableDict.isObservableDict(object)) {
        if (Number.isInteger(nextPathPart)) {
          object = null;
        } else {
          object = object.toOptionalValueGivenKey(nextPathPart as string);
        }
      } else if (ObservableSet.isObservableSet(object)) {
        object = null;
      } else if (Observable.isObservable(object)) {
        const objectValue = object.value as any;
        if (objectValue != null) {
          object = objectValue[nextPathPart];
        }
      } else {
        // should be regular object or array
        object = object[nextPathPart];
      }
    }

    if (Observable.isObservable(object)) {
      this._pathHandles.push(
        object.didChange.subscribe((targetValue) => {
          this._output.setValue(targetValue);
        }, true)
      );
    } else {
      this._output.setValue(object);
    }

    return index && index == length ? object : undefined;
  };
}
