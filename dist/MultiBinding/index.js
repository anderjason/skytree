"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiBinding = void 0;
const ManagedObject_1 = require("../ManagedObject");
const SimpleEvent_1 = require("../SimpleEvent");
class MultiBinding extends ManagedObject_1.ManagedObject {
    constructor(groups) {
        super();
        this.didInvalidate = SimpleEvent_1.SimpleEvent.ofEmpty();
        this._willInvalidateLater = false;
        this._invalidatedSetByGroup = new Map();
        this._groups = groups;
    }
    static givenGroups(groups) {
        return new MultiBinding(groups);
    }
    static givenInputs(group) {
        return new MultiBinding([group]);
    }
    initManagedObject() {
        this._groups.forEach((group) => {
            const invalidatedSet = new Set();
            this._invalidatedSetByGroup.set(group, invalidatedSet);
            group.forEach((input) => {
                this.addHandle(input.didChange.subscribe(() => {
                    invalidatedSet.add(input);
                    this.onChange();
                }));
            });
        });
    }
    isAnyGroupInvalidated() {
        return this._groups.some((group) => {
            const invalidatedSet = this._invalidatedSetByGroup.get(group);
            return invalidatedSet.size === group.length;
        });
    }
    onChange() {
        if (this.isAnyGroupInvalidated()) {
            this.invalidateNow();
            return;
        }
        if (this._willInvalidateLater) {
            return;
        }
        this._willInvalidateLater = true;
        setTimeout(() => {
            if (this._willInvalidateLater == true) {
                this.invalidateNow();
            }
        }, 0);
    }
    invalidateNow() {
        this.didInvalidate.emit();
        this._willInvalidateLater = false;
        for (let [group, invalidatedSet] of this._invalidatedSetByGroup) {
            invalidatedSet.clear();
        }
    }
}
exports.MultiBinding = MultiBinding;
//# sourceMappingURL=index.js.map