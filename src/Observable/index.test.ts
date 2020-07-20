import { Observable } from ".";
import { Test, assert } from "../Test";

Test.define("Observable can take an initial value", () => {
  const instance = Observable.givenValue(5);
  assert(instance.value === 5);
});

Test.define("Observable supports generic types", () => {
  interface Player {
    name: string;
  }

  const bob: Player = {
    name: "Bob",
  };

  const instance = Observable.givenValue<Player>(bob);
  assert(instance.value === bob);
});

Test.define("Observable updates the value when setValue is called", () => {
  const instance = Observable.givenValue(5);

  instance.setValue(10);
  assert(instance.value === 10);
});

Test.define(
  "Observable fires an event when the value is changed using setValue",
  () => {
    const instance = Observable.givenValue(5);

    let didFire = false as boolean;
    const handle = instance.didChange.subscribe(() => {
      didFire = true;
    });

    instance.setValue(10);
    handle.release();

    assert(didFire === true);
  }
);

Test.define(
  "Observable can detect whether an unknown object is observable",
  () => {
    const instance: unknown = Observable.givenValue(5) as unknown;

    assert(Observable.isObservable(instance) === true);
    assert(Observable.isObservable(5) === false);
    assert(Observable.isObservable("something") === false);
  }
);
