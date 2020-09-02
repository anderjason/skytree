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
  private _currentBuildId: number = 0;

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

    this.addHandle(
      Handle.givenCallback(() => {
        console.log("uninit PathBinding");
        this.clearPathHandles();
      })
    );
  }

  private clearPathHandles() {
    this._pathHandles.forEach((handle) => {
      handle.release();
    });
    this._pathHandles = [];
  }

  private rebuild(): void {
    this._currentBuildId += 1;
    if (this._currentBuildId > 1000) {
      this._currentBuildId = 0;
    }

    const thisBuildId = this._currentBuildId;

    this.clearPathHandles();

    let index = 0;
    let parts = this._path.toParts();

    let length = parts.length;

    let inputAtPathStep: any = this._input;

    while (inputAtPathStep != null && index < length) {
      if (
        Observable.isObservable(inputAtPathStep) ||
        ObservableArray.isObservableArray(inputAtPathStep) ||
        ObservableDict.isObservableDict(inputAtPathStep)
      ) {
        this._pathHandles.push(
          inputAtPathStep.didChange.subscribe(() => {
            if (this._currentBuildId === thisBuildId) {
              this.rebuild();
            }
          })
        );
      }

      const nextPathPart = parts[index++];

      if (ObservableArray.isObservableArray(inputAtPathStep)) {
        if (!Number.isInteger(nextPathPart)) {
          inputAtPathStep = null;
        } else {
          inputAtPathStep = inputAtPathStep.toValues()[nextPathPart as number];
        }
      } else if (ObservableDict.isObservableDict(inputAtPathStep)) {
        if (Number.isInteger(nextPathPart)) {
          inputAtPathStep = null;
        } else {
          inputAtPathStep = inputAtPathStep.toOptionalValueGivenKey(
            nextPathPart as string
          );
        }
      } else if (ObservableSet.isObservableSet(inputAtPathStep)) {
        inputAtPathStep = null;
      } else if (Observable.isObservable(inputAtPathStep)) {
        const objectValue = inputAtPathStep.value as any;
        if (objectValue != null) {
          inputAtPathStep = objectValue[nextPathPart];
        }
      } else {
        // should be regular object or array
        inputAtPathStep = inputAtPathStep[nextPathPart];
      }
    }

    if (Observable.isObservable(inputAtPathStep)) {
      console.log("subscribe B");
      this._pathHandles.push(
        inputAtPathStep.didChange.subscribe((targetValue) => {
          this._output.setValue(targetValue);
        }, true)
      );
    } else {
      this._output.setValue(inputAtPathStep);
    }
  }
}
