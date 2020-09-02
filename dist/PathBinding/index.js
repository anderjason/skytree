"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathBinding = void 0;
const Observable_1 = require("../Observable");
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
        this._input = definition.input;
        this._path = definition.path;
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
    initManagedObject() {
        this.rebuild();
        this.addHandle(Handle_1.Handle.givenCallback(() => {
            console.log("uninit PathBinding");
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
        let parts = this._path.toParts();
        let length = parts.length;
        let inputAtPathStep = this._input;
        while (inputAtPathStep != null && index < length) {
            if (Observable_1.Observable.isObservable(inputAtPathStep) ||
                ObservableArray_1.ObservableArray.isObservableArray(inputAtPathStep) ||
                ObservableDict_1.ObservableDict.isObservableDict(inputAtPathStep)) {
                this._pathHandles.push(inputAtPathStep.didChange.subscribe(() => {
                    if (this._currentBuildId === thisBuildId) {
                        this.rebuild();
                    }
                }));
            }
            const nextPathPart = parts[index++];
            if (ObservableArray_1.ObservableArray.isObservableArray(inputAtPathStep)) {
                if (!Number.isInteger(nextPathPart)) {
                    inputAtPathStep = null;
                }
                else {
                    inputAtPathStep = inputAtPathStep.toValues()[nextPathPart];
                }
            }
            else if (ObservableDict_1.ObservableDict.isObservableDict(inputAtPathStep)) {
                if (Number.isInteger(nextPathPart)) {
                    inputAtPathStep = null;
                }
                else {
                    inputAtPathStep = inputAtPathStep.toOptionalValueGivenKey(nextPathPart);
                }
            }
            else if (ObservableSet_1.ObservableSet.isObservableSet(inputAtPathStep)) {
                inputAtPathStep = null;
            }
            else if (Observable_1.Observable.isObservable(inputAtPathStep)) {
                const objectValue = inputAtPathStep.value;
                if (objectValue != null) {
                    inputAtPathStep = objectValue[nextPathPart];
                }
            }
            else {
                // should be regular object or array
                inputAtPathStep = inputAtPathStep[nextPathPart];
            }
        }
        if (Observable_1.Observable.isObservable(inputAtPathStep)) {
            console.log("subscribe B");
            this._pathHandles.push(inputAtPathStep.didChange.subscribe((targetValue) => {
                this._output.setValue(targetValue);
            }, true));
        }
        else {
            this._output.setValue(inputAtPathStep);
        }
    }
}
exports.PathBinding = PathBinding;
//# sourceMappingURL=index.js.map