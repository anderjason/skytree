import { Receipt } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { ManagedObject } from ".";

Test.define("ManagedObject has a unique id per instance", () => {
  const instance1 = new ManagedObject({});
  const instance2 = new ManagedObject({});

  Test.assert(instance1.managedObjectId != null);
  Test.assert(instance1.managedObjectId.length === 8);

  Test.assert(instance2.managedObjectId != null);
  Test.assert(instance2.managedObjectId.length === 8);

  Test.assert(instance1.managedObjectId !== instance2.managedObjectId);
});

Test.define("ManagedObject invokes onActivate when activate is called", () => {
  let didactivate = false as boolean;

  class MySubclass extends ManagedObject {
    onActivate() {
      didactivate = true;
    }
  }

  const instance = new MySubclass({});
  instance.activate();

  Test.assert(didactivate === true);
  Test.assert(instance.isActive.value === true);

  instance.deactivate();
});

Test.define("ManagedObject only invokes onActivate once", () => {
  let activateCount: number = 0;

  class MySubclass extends ManagedObject {
    onActivate() {
      activateCount += 1;
    }
  }

  const instance = new MySubclass({});
  instance.activate();
  instance.activate();
  instance.activate();

  Test.assert(activateCount === 1);

  instance.deactivate();
});

Test.define("ManagedObject returns a receipt from activate", () => {
  class MySubclass extends ManagedObject {
    onActivate() {}
  }

  const instance = new MySubclass({});
  const receipt = instance.activate();

  Test.assert(receipt != null);
  Test.assert(receipt.isCancelled === false);

  instance.deactivate();
});

Test.define(
  "ManagedObject returns the same receipt if activate is called multiple times",
  () => {
    class MySubclass extends ManagedObject {
      onActivate() {}
    }

    const instance = new MySubclass({});
    const receipt1 = instance.activate();
    const receipt2 = instance.activate();
    const receipt3 = instance.activate();

    Test.assert(receipt1 != null);
    Test.assert(receipt1 === receipt2);
    Test.assert(receipt1 === receipt3);

    instance.deactivate();
  }
);

Test.define(
  "ManagedObject is deactivated when the receipt is cancelled",
  () => {
    let releaseCount: number = 0;

    class MySubclass extends ManagedObject {
      onActivate() {
        this.cancelOnDeactivate(
          new Receipt(() => {
            releaseCount += 1;
          })
        );
      }
    }

    const instance = new MySubclass({});
    const receipt1 = instance.activate();
    Test.assert(instance.isActive.value === true);

    Test.assert(releaseCount === 0);
    receipt1.cancel();
    receipt1.cancel();

    Test.assert(releaseCount === 1); // second release has no effect

    // @ts-ignore
    Test.assert(instance.isActive.value === false);

    const receipt2 = instance.activate(); // activate again
    Test.assert(instance.isActive.value === true);

    Test.assert(receipt2 != null);
    Test.assert(receipt1 !== receipt2); // different receipt from the first activate

    receipt2.cancel();

    Test.assert(releaseCount === 2);
    Test.assert(instance.isActive.value === false);
  }
);

Test.define("ManagedObject has a list of child objects", () => {
  class MySubclass extends ManagedObject {
    onActivate() {}
  }

  const parentInstance = new MySubclass({});
  parentInstance.activate();

  Test.assert(parentInstance.childObjects.toValues() != null);
  Test.assert(parentInstance.childObjects.toValues().length === 0);

  parentInstance.deactivate();
});

Test.define(
  "ManagedObject activateializes objects when added as children",
  () => {
    class MySubclass extends ManagedObject {
      onActivate() {}
    }

    const parentInstance = new MySubclass({});
    parentInstance.activate();

    const childInstance = new MySubclass({});
    Test.assert(childInstance.isActive.value === false);

    parentInstance.addManagedObject(childInstance);

    Test.assert(childInstance.isActive.value === true);

    parentInstance.deactivate();
  }
);

Test.define(
  "ManagedObject sets parent of objects when added as children",
  () => {
    class MySubclass extends ManagedObject {
      onActivate() {}
    }

    const parentInstance = new MySubclass({});
    parentInstance.activate();

    const childInstance = new MySubclass({});
    Test.assert(childInstance.parentObject.value == null);

    parentInstance.addManagedObject(childInstance);
    Test.assert(childInstance.parentObject.value === parentInstance);

    parentInstance.deactivate();
  }
);

Test.define(
  "ManagedObject unsets parent of objects when removed as children",
  () => {
    class MySubclass extends ManagedObject {
      onActivate() {}
    }

    const parentInstance = new MySubclass({});
    parentInstance.activate();

    const childInstance = new MySubclass({});
    parentInstance.addManagedObject(childInstance);
    parentInstance.removeManagedObject(childInstance);

    Test.assert(childInstance.parentObject.value == null);

    parentInstance.deactivate();
  }
);

Test.define(
  "ManagedObject removes objects from other parents when added as children",
  () => {
    class MySubclass extends ManagedObject {
      onActivate() {}
    }

    const parentInstance1 = new MySubclass({});
    const parentInstance2 = new MySubclass({});

    parentInstance1.activate();
    parentInstance2.activate();

    const childInstance = new MySubclass({});
    parentInstance1.addManagedObject(childInstance);
    Test.assert(childInstance.parentObject.value === parentInstance1);
    Test.assert(parentInstance1.childObjects.hasValue(childInstance));
    Test.assert(!parentInstance2.childObjects.hasValue(childInstance));

    parentInstance2.addManagedObject(childInstance);
    Test.assert(childInstance.parentObject.value === parentInstance2);
    Test.assert(parentInstance2.childObjects.hasValue(childInstance)); // added
    Test.assert(!parentInstance1.childObjects.hasValue(childInstance)); // removed

    parentInstance1.deactivate();
    parentInstance2.deactivate();
  }
);

Test.define(
  "ManagedObject unactivates child objects when unactivate is called",
  () => {
    class MySubclass extends ManagedObject {
      onActivate() {}
    }

    const parentInstance1 = new MySubclass({});
    parentInstance1.activate();

    const childInstance = new MySubclass({});
    parentInstance1.addManagedObject(childInstance);
    Test.assert(childInstance.isActive.value === true);

    parentInstance1.deactivate();

    Test.assert(childInstance.isActive.value === false);
  }
);

Test.define(
  "ManagedObject activates child objects when activate is called",
  () => {
    class MySubclass extends ManagedObject {
      onActivate() {}
    }

    const parentInstance1 = new MySubclass({});
    const childInstance = new MySubclass({});
    parentInstance1.addManagedObject(childInstance);
    Test.assert(childInstance.isActive.value === false); // parent is not activateialized yet

    parentInstance1.activate();

    Test.assert(childInstance.isActive.value === true);

    parentInstance1.deactivate();
  }
);

Test.define("ManagedObject updates the static activateialized set", () => {
  class MySubclass extends ManagedObject {
    onActivate() {}
  }

  const startValue = ManagedObject.activeSet.count;

  const parentInstance1 = new MySubclass({});
  const childInstance = new MySubclass({});
  parentInstance1.addManagedObject(childInstance);
  parentInstance1.activate();

  Test.assert(ManagedObject.activeSet.count === startValue + 2);

  parentInstance1.deactivate();

  Test.assert(ManagedObject.activeSet.count === startValue);
});
