import {
  Receipt,
  Observable,
  ObservableArray,
  ObservableDict,
  ObservableSet,
  ReadOnlyObservable,
} from "@anderjason/observable";
import { ObjectUtil, ValuePath } from "@anderjason/util";
import { ManagedObject } from "../ManagedObject";

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

  readonly path: ValuePath;

  private _matchedPath = Observable.ofEmpty<ValuePath>(ValuePath.isEqual);
  readonly matchedPath = ReadOnlyObservable.givenObservable(this._matchedPath);

  private _isMatched = Observable.ofEmpty<boolean>(Observable.isStrictEqual);
  readonly isMatched = ReadOnlyObservable.givenObservable(this._isMatched);

  private _input: any;
  private _pathReceipts: Receipt[] = [];
  private _currentBuildId: number = 0;

  private constructor(definition: PathBindingDefinition) {
    super();

    this._input = definition.input;
    this.path = definition.path;

    if (Observable.isObservable(definition.output)) {
      this._output = definition.output;
    } else {
      this._output = Observable.ofEmpty(ObjectUtil.objectIsDeepEqual);
    }

    this.output = ReadOnlyObservable.givenObservable(this._output);
  }

  initManagedObject() {
    this.rebuild();

    this.addReceipt(
      Receipt.givenCancelFunction(() => {
        this.clearPathReceipts();
      })
    );
  }

  private clearPathReceipts() {
    this._pathReceipts.forEach((receipt) => {
      receipt.cancel();
    });
    this._pathReceipts = [];
  }

  private rebuild(): void {
    this._currentBuildId += 1;
    if (this._currentBuildId > 1000) {
      this._currentBuildId = 0;
    }

    const thisBuildId = this._currentBuildId;

    this.clearPathReceipts();

    let index = 0;
    let parts = this.path.toParts();

    let inputAtPathStep: any = this._input;
    let isMatch = inputAtPathStep != null;

    let matchedPathParts = [];

    while (isMatch) {
      if (
        Observable.isObservable(inputAtPathStep) ||
        ObservableArray.isObservableArray(inputAtPathStep) ||
        ObservableDict.isObservableDict(inputAtPathStep)
      ) {
        this._pathReceipts.push(
          inputAtPathStep.didChange.subscribe(() => {
            if (this._currentBuildId === thisBuildId) {
              this.rebuild();
            }
          })
        );
      }

      const nextPathStep = parts[index++];
      let nextInput: any;

      if (ObservableArray.isObservableArray(inputAtPathStep)) {
        if (!Number.isInteger(nextPathStep)) {
          nextInput = null; // stop here
        } else {
          nextInput = inputAtPathStep.toValues()[nextPathStep as number];
        }
      } else if (ObservableDict.isObservableDict(inputAtPathStep)) {
        if (Number.isInteger(nextPathStep)) {
          nextInput = null;
        } else {
          nextInput = inputAtPathStep.toOptionalValueGivenKey(
            nextPathStep as string
          );
        }
      } else if (ObservableSet.isObservableSet(inputAtPathStep)) {
        nextInput = null;
      } else if (Observable.isObservable(inputAtPathStep)) {
        const objectValue = inputAtPathStep.value as any;
        if (objectValue != null) {
          nextInput = objectValue[nextPathStep];
        }
      } else {
        // should be regular object or array
        nextInput = inputAtPathStep[nextPathStep];
      }

      if (nextInput != null) {
        inputAtPathStep = nextInput;
        matchedPathParts.push(nextPathStep);
      } else {
        isMatch = false;
      }
    }

    this._matchedPath.setValue(ValuePath.givenParts(matchedPathParts));
    const isMatched = this.matchedPath.value.isEqual(this.path);

    if (isMatched) {
      const matchedInput = inputAtPathStep;
      if (Observable.isObservable(matchedInput)) {
        this._output.setValue(matchedInput.value);
      } else if (ObservableArray.isObservableArray(matchedInput)) {
        this._output.setValue(matchedInput.toValues());
      } else if (ObservableDict.isObservableDict(matchedInput)) {
        this._output.setValue(matchedInput.toValues());
      } else {
        this._output.setValue(matchedInput);
      }
    } else {
      this._output.setValue(undefined);
    }

    this._isMatched.setValue(isMatched);
  }
}
