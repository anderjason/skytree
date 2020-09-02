"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathBinding = void 0;
const Observable_1 = require("../Observable");
const ValuePath_1 = require("../ValuePath");
const ManagedObject_1 = require("../ManagedObject");
const Handle_1 = require("../Handle");
const ObservableArray_1 = require("../ObservableArray");
const ObservableSet_1 = require("../ObservableSet");
const ObservableDict_1 = require("../ObservableDict");
const ReadOnlyObservable_1 = require("../ReadOnlyObservable");
class PathBinding extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._pathHandles = [];
        this._currentBuildId = 0;
        this._matchedPath = [];
        this._input = definition.input;
        this.path = definition.path;
        if (Observable_1.Observable.isObservable(definition.output)) {
            this._output = definition.output;
        }
        else {
            this._output = Observable_1.Observable.ofEmpty(Observable_1.Observable.isStrictEqual);
        }
        this.output = ReadOnlyObservable_1.ReadOnlyObservable.givenObservable(this._output);
    }
    static givenDefinition(definition) {
        return new PathBinding(definition);
    }
    get matchedPath() {
        return ValuePath_1.ValuePath.givenParts(this._matchedPath);
    }
    initManagedObject() {
        this.rebuild();
        this.addHandle(Handle_1.Handle.givenCallback(() => {
            this.clearPathHandles();
        }));
    }
    clearPathHandles() {
        this._pathHandles.forEach((handle) => {
            handle.release();
        });
        this._pathHandles = [];
    }
    rebuild() {
        this._currentBuildId += 1;
        if (this._currentBuildId > 1000) {
            this._currentBuildId = 0;
        }
        const thisBuildId = this._currentBuildId;
        this.clearPathHandles();
        let index = 0;
        let parts = this.path.toParts();
        let inputAtPathStep = this._input;
        let isMatch = inputAtPathStep != null;
        this._matchedPath = [];
        while (isMatch) {
            if (Observable_1.Observable.isObservable(inputAtPathStep) ||
                ObservableArray_1.ObservableArray.isObservableArray(inputAtPathStep) ||
                ObservableDict_1.ObservableDict.isObservableDict(inputAtPathStep)) {
                this._pathHandles.push(inputAtPathStep.didChange.subscribe(() => {
                    if (this._currentBuildId === thisBuildId) {
                        this.rebuild();
                    }
                }));
            }
            const nextPathStep = parts[index++];
            let nextInput;
            if (ObservableArray_1.ObservableArray.isObservableArray(inputAtPathStep)) {
                if (!Number.isInteger(nextPathStep)) {
                    nextInput = null; // stop here
                }
                else {
                    nextInput = inputAtPathStep.toValues()[nextPathStep];
                }
            }
            else if (ObservableDict_1.ObservableDict.isObservableDict(inputAtPathStep)) {
                if (Number.isInteger(nextPathStep)) {
                    nextInput = null;
                }
                else {
                    nextInput = inputAtPathStep.toOptionalValueGivenKey(nextPathStep);
                }
            }
            else if (ObservableSet_1.ObservableSet.isObservableSet(inputAtPathStep)) {
                nextInput = null;
            }
            else if (Observable_1.Observable.isObservable(inputAtPathStep)) {
                const objectValue = inputAtPathStep.value;
                if (objectValue != null) {
                    nextInput = objectValue[nextPathStep];
                }
            }
            else {
                // should be regular object or array
                nextInput = inputAtPathStep[nextPathStep];
            }
            if (nextInput != null) {
                inputAtPathStep = nextInput;
                this._matchedPath.push(nextPathStep);
            }
            else {
                isMatch = false;
            }
        }
        if (!this.matchedPath.isEqual(this.path)) {
            this._output.setValue(undefined);
            return;
        }
        const matchedInput = inputAtPathStep;
        if (Observable_1.Observable.isObservable(matchedInput)) {
            this._output.setValue(matchedInput.value);
        }
        else if (ObservableArray_1.ObservableArray.isObservableArray(matchedInput)) {
            this._output.setValue(matchedInput.toValues());
        }
        else if (ObservableDict_1.ObservableDict.isObservableDict(matchedInput)) {
            this._output.setValue(matchedInput.toValues());
        }
        else {
            this._output.setValue(matchedInput);
        }
    }
}
exports.PathBinding = PathBinding;
//# sourceMappingURL=index.js.map