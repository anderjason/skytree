import { Receipt } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { Actor } from ".";

Test.define("Actor invokes onActivate when activate is called", () => {
  let didActivate = false as boolean;

  class MySubclass extends Actor {
    onActivate() {
      didActivate = true;
    }
  }

  const actor = new MySubclass({});
  actor.activate();

  Test.assert(didActivate === true, "didActivate should be true");
  Test.assert(actor.isActive === true, "isActive should be true");

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

  Test.assert(activateCount === 1, "activateCount should be 1");

  actor.deactivate();
});

Test.define("Actor returns a receipt from activate", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const actor = new MySubclass({});
  const receipt = actor.activate();

  Test.assert(receipt != null, "receipt should not be null");
  Test.assert(receipt.isCancelled === false, "receipt.isCancelled should be false");

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

    Test.assert(receipt1 != null, "receipt1 should not be null");
    Test.assert(receipt1 === receipt2, "receipt1 should be receipt2");
    Test.assert(receipt1 === receipt3, "receipt1 should be receipt3");

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
  Test.assert(actor.isActive === true, "actor.isActive should be true");

  Test.assert(releaseCount === 0, "releaseCount should be 0");
  receipt1.cancel();
  receipt1.cancel();

  Test.assert(releaseCount === 1, "releaseCount should be 1" ); // second release has no effect

  // @ts-ignore
  Test.assert(actor.isActive === false);

  const receipt2 = actor.activate(); // activate again
  Test.assert(actor.isActive === true, "actor.isActive should be true");

  Test.assert(receipt2 != null, "receipt2 should not be null");
  Test.assert(receipt1 !== receipt2, "receipt1 should not be receipt2"); // different receipt from the first activate

  receipt2.cancel();

  Test.assert(releaseCount === 2, "releaseCount should be 2");
  Test.assert(actor.isActive === false, "actor.isActive should be false");
});

Test.define("Actor has a list of child objects", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  Test.assert(parentInstance.childObjects != null, "parentInstance.childObjects should not be null");
  Test.assert(Array.from(parentInstance.childObjects).length === 0, "parentInstance.childObjects should be empty");

  parentInstance.deactivate();
});

Test.define("Actor activates objects when added as children", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  const childInstance = new MySubclass({});
  Test.assert(childInstance.isActive === false, "childInstance.isActive should be false");

  parentInstance.addActor(childInstance);

  Test.assert(childInstance.isActive === true, "childInstance.isActive should be true");

  parentInstance.deactivate();
});

Test.define("Actor sets parent of objects when added as children", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  const childInstance = new MySubclass({});
  Test.assert(childInstance.parentObject == null, "childInstance.parentObject should be null");

  parentInstance.addActor(childInstance);
  Test.assert(childInstance.parentObject === parentInstance, "childInstance.parentObject should be parentInstance");

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

  Test.assert(childInstance.parentObject == null, "childInstance.parentObject should be null");

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
    Test.assert(childInstance.parentObject === parentInstance1, "childInstance.parentObject should be parentInstance1");
    Test.assert(new Set(parentInstance1.childObjects).has(childInstance), "parentInstance1.childObjects should contain childInstance");
    Test.assert(!new Set(parentInstance2.childObjects).has(childInstance), "parentInstance2.childObjects should not contain childInstance");

    parentInstance2.addActor(childInstance);
    Test.assert(childInstance.parentObject === parentInstance2, "childInstance.parentObject should be parentInstance2");
    Test.assert(new Set(parentInstance2.childObjects).has(childInstance), "parentInstance2.childObjects should contain childInstance");
    Test.assert(!new Set(parentInstance1.childObjects).has(childInstance), "parentInstance1.childObjects should not contain childInstance");

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
  Test.assert(childInstance.isActive === true, "childInstance.isActive should be true");

  parentInstance1.deactivate();

  Test.assert(childInstance.isActive === false, "childInstance.isActive should be false");
});

Test.define("Actor activates child objects when activate is called", () => {
  class MySubclass extends Actor {
    onActivate() {}
  }

  const parentInstance1 = new MySubclass({});
  const childInstance = new MySubclass({});
  parentInstance1.addActor(childInstance);
   // parent is not activated yet
  Test.assert(childInstance.isActive === false, "childInstance.isActive should be false");

  parentInstance1.activate();

  Test.assert(childInstance.isActive === true, "childInstance.isActive should be true");

  parentInstance1.deactivate();
});
