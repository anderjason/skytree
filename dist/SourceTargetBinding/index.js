"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceTargetBinding = void 0;
const Actor_1 = require("../Actor");
const observable_1 = require("@anderjason/observable");
class SourceTargetBinding extends Actor_1.Actor {
    constructor() {
        super(...arguments);
        this._source = observable_1.Observable.ofEmpty(observable_1.Observable.isStrictEqual);
        this.source = observable_1.ReadOnlyObservable.givenObservable(this._source);
        this._target = observable_1.Observable.ofEmpty(observable_1.Observable.isStrictEqual);
        this.target = observable_1.ReadOnlyObservable.givenObservable(this._target);
    }
    onActivate() {
        if (this._source.value == null) {
            this.setSource(this.props.source);
        }
        if (this._target.value == null) {
            this.setTarget(this.props.target);
        }
        this.cancelOnDeactivate(this.source.didChange.subscribe((source) => {
            if (this._sourceValueReceipt != null) {
                this.removeCancelOnDeactivate(this._sourceValueReceipt);
                this._sourceValueReceipt.cancel();
                this._sourceValueReceipt = undefined;
            }
            if (source != null) {
                this._sourceValueReceipt = this.cancelOnDeactivate(source.didChange.subscribe(() => {
                    this.updateTarget();
                }, true));
            }
            this.updateTarget();
        }, true));
        this.cancelOnDeactivate(this.target.didChange.subscribe(() => {
            this.updateTarget();
        }));
        this.cancelOnDeactivate(new observable_1.Receipt(() => {
            if (this._sourceValueReceipt != null) {
                this.removeCancelOnDeactivate(this._sourceValueReceipt);
                this._sourceValueReceipt.cancel();
                this._sourceValueReceipt = undefined;
            }
        }));
    }
    setSource(newSource) {
        if (observable_1.Observable.isObservable(newSource)) {
            this._source.setValue(newSource);
        }
        else {
            this._source.setValue(observable_1.Observable.givenValue(newSource));
        }
    }
    setTarget(newTarget) {
        this._target.setValue(newTarget);
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
exports.SourceTargetBinding = SourceTargetBinding;
//# sourceMappingURL=index.js.map