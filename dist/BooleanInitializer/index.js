"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanInitializer = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Observable_1 = require("../Observable");
class BooleanInitializer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._input = definition.input;
        this._instance = definition.instance;
    }
    static givenDefinition(definition) {
        return new BooleanInitializer(definition);
    }
    static givenCondition(definition) {
        const isActive = Observable_1.Observable.ofEmpty(Observable_1.Observable.isStrictEqual);
        const handle = definition.input.didChange.subscribe((input) => {
            isActive.setValue(definition.isActive(input));
        }, true);
        const result = new BooleanInitializer({
            input: isActive,
            instance: definition.instance,
        });
        result.addHandle(handle);
        return result;
    }
    get instance() {
        return this._activeInstance;
    }
    initManagedObject() {
        this.addHandle(this._input.didChange.subscribe((isActive) => {
            if (isActive) {
                if (this._activeInstance == null) {
                    this._activeInstance = this.addManagedObject(this._instance);
                }
            }
            else {
                if (this._activeInstance != null) {
                    this.removeManagedObject(this._activeInstance);
                    this._activeInstance = undefined;
                }
            }
        }, true));
    }
}
exports.BooleanInitializer = BooleanInitializer;
//# sourceMappingURL=index.js.map