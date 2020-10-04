import { Receipt } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { Actor } from ".";

Test.define("Actor has a unique id per actor", () => {
  const actor1 = new Actor({});
  const actor2 = new Actor({});

  Test.assert(actor1.managedObjectId != null);
  Test.assert(actor1.managedObjectId.length === 8);

  Test.assert(actor2.managedObjectId != null);
  Test.assert(actor2.managedObjectId.length === 8);

  Test.assert(actor1.managedObjectId !== actor2.managedObjectId);
});

Test.define("Actor invokes onActivate when activate is called", () => {
  let didactivate = false as boolean;

  class MySubclass extends Actor {
    onActivate() {
      didactivate = true;
    }
  }

  const actor = new MySubclass({});
  actor.activate();

  Test.assert(didactivate === true);
  Test.assert(actor.isActive.value === true);

  actor.deactivate();
});

Test.define("Actor only invokes onActivate once", () => {
  let activateCount: number = 0;

  class MySubclass extends Actor {
    onActivate() {
      activateCount += 1;
    }
  }

  const actor = new MySubclass({});
  actor.activate();
  actor.activate();
  actor.activate();

  Test.assert(activateCount === 1);

  actor.deactivate();
});

Test.define("Actor returns a receipt from activate", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const actor = new MySubclass({});
  const receipt = actor.activate();

  Test.assert(receipt != null);
  Test.assert(receipt.isCancelled === false);

  actor.deactivate();
});

Test.define(
  "Actor returns the same receipt if activate is called multiple times",
  () => {
    class MySubclass extends Actor {
      onActivate() {}
    }

    const actor = new MySubclass({});
    const receipt1 = actor.activate();
    const receipt2 = actor.activate();
    const receipt3 = actor.activate();

    Test.assert(receipt1 != null);
    Test.assert(receipt1 === receipt2);
    Test.assert(receipt1 === receipt3);

    actor.deactivate();
  }
);

Test.define("Actor is deactivated when the receipt is cancelled", () => {
  let releaseCount: number = 0;

  class MySubclass extends Actor {
    onActivate() {
      this.cancelOnDeactivate(
        new Receipt(() => {
          releaseCount += 1;
        })
      );
    }
  }

  const actor = new MySubclass({});
  const receipt1 = actor.activate();
  Test.assert(actor.isActive.value === true);

  Test.assert(releaseCount === 0);
  receipt1.cancel();
  receipt1.cancel();

  Test.assert(releaseCount === 1); // second release has no effect

  // @ts-ignore
  Test.assert(actor.isActive.value === false);

  const receipt2 = actor.activate(); // activate again
  Test.assert(actor.isActive.value === true);

  Test.assert(receipt2 != null);
  Test.assert(receipt1 !== receipt2); // different receipt from the first activate

  receipt2.cancel();

  Test.assert(releaseCount === 2);
  Test.assert(actor.isActive.value === false);
});

Test.define("Actor has a list of child objects", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  Test.assert(parentInstance.childObjects.toValues() != null);
  Test.assert(parentInstance.childObjects.toValues().length === 0);

  parentInstance.deactivate();
});

Test.define("Actor activates objects when added as children", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  const childInstance = new MySubclass({});
  Test.assert(childInstance.isActive.value === false);

  parentInstance.addActor(childInstance);

  Test.assert(childInstance.isActive.value === true);

  parentInstance.deactivate();
});

Test.define("Actor sets parent of objects when added as children", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  const childInstance = new MySubclass({});
  Test.assert(childInstance.parentObject.value == null);

  parentInstance.addActor(childInstance);
  Test.assert(childInstance.parentObject.value === parentInstance);

  parentInstance.deactivate();
});

Test.define("Actor unsets parent of objects when removed as children", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  const childInstance = new MySubclass({});
  parentInstance.addActor(childInstance);
  parentInstance.removeActor(childInstance);

  Test.assert(childInstance.parentObject.value == null);

  parentInstance.deactivate();
});

Test.define(
  "Actor removes objects from other parents when added as children",
  () => {
    class MySubclass extends Actor {
      onActivate() {}
    }

    const parentInstance1 = new MySubclass({});
    const parentInstance2 = new MySubclass({});

    parentInstance1.activate();
    parentInstance2.activate();

    const childInstance = new MySubclass({});
    parentInstance1.addActor(childInstance);
    Test.assert(childInstance.parentObject.value === parentInstance1);
    Test.assert(parentInstance1.childObjects.hasValue(childInstance));
    Test.assert(!parentInstance2.childObjects.hasValue(childInstance));

    parentInstance2.addActor(childInstance);
    Test.assert(childInstance.parentObject.value === parentInstance2);
    Test.assert(parentInstance2.childObjects.hasValue(childInstance)); // added
    Test.assert(!parentInstance1.childObjects.hasValue(childInstance)); // removed

    parentInstance1.deactivate();
    parentInstance2.deactivate();
  }
);

Test.define("Actor unactivates child objects when unactivate is called", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance1 = new MySubclass({});
  parentInstance1.activate();

  const childInstance = new MySubclass({});
  parentInstance1.addActor(childInstance);
  Test.assert(childInstance.isActive.value === true);

  parentInstance1.deactivate();

  Test.assert(childInstance.isActive.value === false);
});

Test.define("Actor activates child objects when activate is called", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance1 = new MySubclass({});
  const childInstance = new MySubclass({});
  parentInstance1.addActor(childInstance);
  Test.assert(childInstance.isActive.value === false); // parent is not activateialized yet

  parentInstance1.activate();

  Test.assert(childInstance.isActive.value === true);

  parentInstance1.deactivate();
});

Test.define("Actor updates the static activateialized set", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const startValue = Actor.activeSet.count;

  const parentInstance1 = new MySubclass({});
  const childInstance = new MySubclass({});
  parentInstance1.addActor(childInstance);
  parentInstance1.activate();

  Test.assert(Actor.activeSet.count === startValue + 2);

  parentInstance1.deactivate();

  Test.assert(Actor.activeSet.count === startValue);
});
