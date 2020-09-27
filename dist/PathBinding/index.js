"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathBinding = void 0;
const observable_1 = require("@anderjason/observable");
const util_1 = require("@anderjason/util");
const ManagedObject_1 = require("../ManagedObject");
class PathBinding extends ManagedObject_1.ManagedObject {
    constructor(props) {
        super(props);
        if (observable_1.Observable.isObservable(props.output)) {
            this._output = props.output;
        }
        else {
            this._output = observable_1.Observable.ofEmpty(observable_1.Observable.isStrictEqual);
        }
        this.output = observable_1.ReadOnlyObservable.givenObservable(this._output);
    }
    static refreshAllHavingInput(input) {
        const bindingGroup = this.bindingGroupsByInput.get(input);
        if (bindingGroup == null) {
            return;
        }
        const bindings = util_1.ArrayUtil.arrayWithOrderFromValue(Array.from(bindingGroup.bindings), (binding) => binding.props.path.toParts().length, "ascending");
        bindings.forEach((binding) => {
            binding.refresh();
        });
    }
    onActivate() {
        let bindingGroup = PathBinding.bindingGroupsByInput.get(this.props.input);
        if (bindingGroup == null) {
            bindingGroup = {
                bindings: new Set(),
                inputReceipt: this.props.input.didChange.subscribe(() => {
                    PathBinding.refreshAllHavingInput(this.props.input);
                }),
            };
            PathBinding.bindingGroupsByInput.set(this.props.input, bindingGroup);
        }
        bindingGroup.bindings.add(this);
        this.refresh();
        this.cancelOnDeactivate(new observable_1.Receipt(() => {
            bindingGroup.bindings.delete(this);
            if (bindingGroup.bindings.size === 0) {
                bindingGroup.inputReceipt.cancel();
                PathBinding.bindingGroupsByInput.delete(this.props.input);
            }
        }));
    }
    refresh() {
        this._output.setValue(util_1.ObjectUtil.optionalValueAtPathGivenObject(this.props.input.value, this.props.path));
    }
}
exports.PathBinding = PathBinding;
PathBinding.bindingGroupsByInput = new Map();
//# sourceMappingURL=index.js.map