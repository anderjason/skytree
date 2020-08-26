"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathBinding = void 0;
const Observable_1 = require("../Observable");
const ManagedObject_1 = require("../ManagedObject");
const Handle_1 = require("../Handle");
const ObservableArray_1 = require("../ObservableArray");
const ObservableSet_1 = require("../ObservableSet");
const ReadOnlyObservable_1 = require("../ReadOnlyObservable");
class PathBinding extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._pathHandles = [];
        this.clearPathHandles = () => {
            this._pathHandles.forEach((handle) => {
                handle.release();
            });
            this._pathHandles = [];
        };
        this.rebuild = () => {
            this.clearPathHandles();
            let index = 0;
            let parts = this._path.toParts();
            let length = parts.length;
            let object = this._input;
            while (object != null && index < length) {
                if (Observable_1.Observable.isObservable(object) ||
                    ObservableArray_1.ObservableArray.isObservableArray(object)) {
                    this._pathHandles.push(object.didChange.subscribe(() => {
                        this.rebuild();
                    }));
                }
                const nextPathPart = parts[index++];
                if (ObservableArray_1.ObservableArray.isObservableArray(object)) {
                    if (!Number.isInteger(nextPathPart)) {
                        object = null;
                    }
                    else {
                        object = object.toValues()[nextPathPart];
                    }
                }
                else if (ObservableSet_1.ObservableSet.isObservableSet(object)) {
                    object = null;
                }
                else if (Observable_1.Observable.isObservable(object)) {
                    const objectValue = object.value;
                    if (objectValue != null) {
                        object = objectValue[nextPathPart];
                    }
                }
                else {
                    // should be regular object or array
                    object = object[nextPathPart];
                }
            }
            if (Observable_1.Observable.isObservable(object)) {
                this._pathHandles.push(object.didChange.subscribe((targetValue) => {
                    this._output.setValue(targetValue);
                }, true));
            }
            else {
                this._output.setValue(object);
            }
            return index && index == length ? object : undefined;
        };
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
        this.addHandle(Handle_1.Handle.givenCallback(this.clearPathHandles));
    }
}
exports.PathBinding = PathBinding;
//# sourceMappingURL=index.js.map