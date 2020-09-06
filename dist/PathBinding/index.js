"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathBinding = void 0;
const observable_1 = require("@anderjason/observable");
const util_1 = require("@anderjason/util");
const ManagedObject_1 = require("../ManagedObject");
class PathBinding extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._matchedPath = observable_1.Observable.ofEmpty(util_1.ValuePath.isEqual);
        this.matchedPath = observable_1.ReadOnlyObservable.givenObservable(this._matchedPath);
        this._isMatched = observable_1.Observable.ofEmpty(observable_1.Observable.isStrictEqual);
        this.isMatched = observable_1.ReadOnlyObservable.givenObservable(this._isMatched);
        this._pathReceipts = [];
        this._currentBuildId = 0;
        this._input = definition.input;
        this.path = definition.path;
        if (observable_1.Observable.isObservable(definition.output)) {
            this._output = definition.output;
        }
        else {
            this._output = observable_1.Observable.ofEmpty(util_1.ObjectUtil.objectIsDeepEqual);
        }
        this.output = observable_1.ReadOnlyObservable.givenObservable(this._output);
    }
    static givenDefinition(definition) {
        return new PathBinding(definition);
    }
    initManagedObject() {
        this.rebuild();
        this.addReceipt(observable_1.Receipt.givenCancelFunction(() => {
            this.clearPathReceipts();
        }));
    }
    clearPathReceipts() {
        this._pathReceipts.forEach((receipt) => {
            receipt.cancel();
        });
        this._pathReceipts = [];
    }
    rebuild() {
        this._currentBuildId += 1;
        if (this._currentBuildId > 1000) {
            this._currentBuildId = 0;
        }
        const thisBuildId = this._currentBuildId;
        this.clearPathReceipts();
        let index = 0;
        let parts = this.path.toParts();
        let inputAtPathStep = this._input;
        let isMatch = inputAtPathStep != null;
        let matchedPathParts = [];
        while (isMatch) {
            if (observable_1.Observable.isObservable(inputAtPathStep) ||
                observable_1.ObservableArray.isObservableArray(inputAtPathStep) ||
                observable_1.ObservableDict.isObservableDict(inputAtPathStep)) {
                this._pathReceipts.push(inputAtPathStep.didChange.subscribe(() => {
                    if (this._currentBuildId === thisBuildId) {
                        this.rebuild();
                    }
                }));
            }
            const nextPathStep = parts[index++];
            let nextInput;
            if (observable_1.ObservableArray.isObservableArray(inputAtPathStep)) {
                if (!Number.isInteger(nextPathStep)) {
                    nextInput = null; // stop here
                }
                else {
                    nextInput = inputAtPathStep.toValues()[nextPathStep];
                }
            }
            else if (observable_1.ObservableDict.isObservableDict(inputAtPathStep)) {
                if (Number.isInteger(nextPathStep)) {
                    nextInput = null;
                }
                else {
                    nextInput = inputAtPathStep.toOptionalValueGivenKey(nextPathStep);
                }
            }
            else if (observable_1.ObservableSet.isObservableSet(inputAtPathStep)) {
                nextInput = null;
            }
            else if (observable_1.Observable.isObservable(inputAtPathStep)) {
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
                matchedPathParts.push(nextPathStep);
            }
            else {
                isMatch = false;
            }
        }
        this._matchedPath.setValue(util_1.ValuePath.givenParts(matchedPathParts));
        const isMatched = this.matchedPath.value.isEqual(this.path);
        if (isMatched) {
            const matchedInput = inputAtPathStep;
            if (observable_1.Observable.isObservable(matchedInput)) {
                this._output.setValue(matchedInput.value);
            }
            else if (observable_1.ObservableArray.isObservableArray(matchedInput)) {
                this._output.setValue(matchedInput.toValues());
            }
            else if (observable_1.ObservableDict.isObservableDict(matchedInput)) {
                this._output.setValue(matchedInput.toValues());
            }
            else {
                this._output.setValue(matchedInput);
            }
        }
        else {
            this._output.setValue(undefined);
        }
        this._isMatched.setValue(isMatched);
    }
}
exports.PathBinding = PathBinding;
//# sourceMappingURL=index.js.map