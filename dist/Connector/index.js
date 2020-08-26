"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
const ManagedObject_1 = require("../ManagedObject");
const Observable_1 = require("../Observable");
const Handle_1 = require("../Handle");
class Connector extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this.source = Observable_1.Observable.ofEmpty(Observable_1.Observable.isStrictEqual);
        this.target = Observable_1.Observable.ofEmpty(Observable_1.Observable.isStrictEqual);
        this.source.setValue(definition.source);
        this.target.setValue(definition.target);
    }
    static givenDefinition(definition) {
        return new Connector(definition);
    }
    initManagedObject() {
        this.addHandle(this.source.didChange.subscribe((source) => {
            if (this._sourceValueHandle != null) {
                this._sourceValueHandle.release();
                this.removeHandle(this._sourceValueHandle);
                this._sourceValueHandle = undefined;
            }
            if (source != null) {
                this._sourceValueHandle = this.addHandle(source.didChange.subscribe(() => {
                    this.updateTarget();
                }, true));
            }
        }));
        this.addHandle(this.target.didChange.subscribe(() => {
            this.updateTarget();
        }));
        this.addHandle(Handle_1.Handle.givenCallback(() => {
            if (this._sourceValueHandle != null) {
                this._sourceValueHandle.release();
                this.removeHandle(this._sourceValueHandle);
                this._sourceValueHandle = undefined;
            }
        }));
    }
    updateTarget() {
        const source = this.source.value;
        const target = this.target.value;
        if (source == null || target == null) {
            return;
        }
        target.setValue(source.value);
    }
}
exports.Connector = Connector;
//# sourceMappingURL=index.js.map