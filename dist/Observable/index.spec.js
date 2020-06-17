"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert = require("assert");
const _1 = require(".");
describe("Observable", () => {
    it("takes an initial value", () => {
        const instance = _1.Observable.givenValue(5);
        assert(instance.value === 5);
    });
    it("supports generic types", () => {
        const bob = {
            name: "Bob",
        };
        const instance = _1.Observable.givenValue(bob);
        assert(instance.value === bob);
    });
    it("updates the value when setValue is called", () => {
        const instance = _1.Observable.givenValue(5);
        instance.setValue(10);
        assert(instance.value === 10);
    });
    it("fires an event when the value is changed using setValue", () => {
        const instance = _1.Observable.givenValue(5);
        let didFire = false;
        const handle = instance.didChange.subscribe(() => {
            didFire = true;
        });
        instance.setValue(10);
        handle.release();
        assert(didFire === true);
    });
    it("can detect whether an unknown object is observable", () => {
        const instance = _1.Observable.givenValue(5);
        assert(_1.Observable.isObservable(instance) === true);
        assert(_1.Observable.isObservable(5) === false);
        assert(_1.Observable.isObservable("something") === false);
    });
});
//# sourceMappingURL=index.spec.js.map