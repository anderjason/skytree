import { Receipt } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { Actor } from ".";

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
  Test.assert(actor.isActive === true);

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
  Test.assert(actor.isActive === true);

  Test.assert(releaseCount === 0);
  receipt1.cancel();
  receipt1.cancel();

  Test.assert(releaseCount === 1); // second release has no effect

  // @ts-ignore
  Test.assert(actor.isActive === false);

  const receipt2 = actor.activate(); // activate again
  Test.assert(actor.isActive === true);

  Test.assert(receipt2 != null);
  Test.assert(receipt1 !== receipt2); // different receipt from the first activate

  receipt2.cancel();

  Test.assert(releaseCount === 2);
  Test.assert(actor.isActive === false);
});

Test.define("Actor has a list of child objects", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  Test.assert(parentInstance.childObjects != null);
  Test.assert(Array.from(parentInstance.childObjects).length === 0);

  parentInstance.deactivate();
});

Test.define("Actor activates objects when added as children", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  const childInstance = new MySubclass({});
  Test.assert(childInstance.isActive === false);

  parentInstance.addActor(childInstance);

  Test.assert(childInstance.isActive === true);

  parentInstance.deactivate();
});

Test.define("Actor sets parent of objects when added as children", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  const childInstance = new MySubclass({});
  Test.assert(childInstance.parentObject == null);

  parentInstance.addActor(childInstance);
  Test.assert(childInstance.parentObject === parentInstance);

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

  Test.assert(childInstance.parentObject == null);

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
    Test.assert(childInstance.parentObject === parentInstance1);
    Test.assert(new Set(parentInstance1.childObjects).has(childInstance));
    Test.assert(!new Set(parentInstance2.childObjects).has(childInstance));

    parentInstance2.addActor(childInstance);
    Test.assert(childInstance.parentObject === parentInstance2);
    Test.assert(new Set(parentInstance2.childObjects).has(childInstance)); // added
    Test.assert(!new Set(parentInstance1.childObjects).has(childInstance)); // removed

    parentInstance1.deactivate();
    parentInstance2.deactivate();
  }
);

Test.define("Actor unactivates child objects when deactivate is called", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance1 = new MySubclass({});
  parentInstance1.activate();

  const childInstance = new MySubclass({});
  parentInstance1.addActor(childInstance);
  Test.assert(childInstance.isActive === true);

  parentInstance1.deactivate();

  Test.assert(childInstance.isActive === false);
});

Test.define("Actor activates child objects when activate is called", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance1 = new MySubclass({});
  const childInstance = new MySubclass({});
  parentInstance1.addActor(childInstance);
  Test.assert(childInstance.isActive === false); // parent is not activated yet

  parentInstance1.activate();

  Test.assert(childInstance.isActive === true);

  parentInstance1.deactivate();
});
