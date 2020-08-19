"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalInitializer = void 0;
const ManagedObject_1 = require("../ManagedObject");
class ConditionalInitializer extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this._input = definition.input;
        this._shouldInitialize = definition.fn;
        this._instance = definition.instance;
    }
    static givenDefinition(definition) {
        return new ConditionalInitializer(definition);
    }
    get instance() {
        return this._activeInstance;
    }
    initManagedObject() {
        this.addHandle(this._input.didChange.subscribe((input) => {
            const isActive = this._shouldInitialize(input);
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
exports.ConditionalInitializer = ConditionalInitializer;
//# sourceMappingURL=index.js.map