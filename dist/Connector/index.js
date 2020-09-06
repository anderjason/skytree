"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
const ManagedObject_1 = require("../ManagedObject");
const observable_1 = require("@anderjason/observable");
class Connector extends ManagedObject_1.ManagedObject {
    constructor(definition) {
        super();
        this.source = observable_1.Observable.ofEmpty(observable_1.Observable.isStrictEqual);
        this.target = observable_1.Observable.ofEmpty(observable_1.Observable.isStrictEqual);
        this.source.setValue(definition.source);
        this.target.setValue(definition.target);
    }
    static givenDefinition(definition) {
        return new Connector(definition);
    }
    initManagedObject() {
        this.addReceipt(this.source.didChange.subscribe((source) => {
            if (this._sourceValueReceipt != null) {
                this._sourceValueReceipt.cancel();
                this.removeReceipt(this._sourceValueReceipt);
                this._sourceValueReceipt = undefined;
            }
            if (source != null) {
                this._sourceValueReceipt = this.addReceipt(source.didChange.subscribe(() => {
                    this.updateTarget();
                }, true));
            }
            this.updateTarget();
        }, true));
        this.addReceipt(this.target.didChange.subscribe(() => {
            this.updateTarget();
        }));
        this.addReceipt(observable_1.Receipt.givenCancelFunction(() => {
            if (this._sourceValueReceipt != null) {
                this._sourceValueReceipt.cancel();
                this.removeReceipt(this._sourceValueReceipt);
                this._sourceValueReceipt = undefined;
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