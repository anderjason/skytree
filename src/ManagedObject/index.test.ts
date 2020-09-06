import { Receipt } from "@anderjason/observable";
import { Test } from "@anderjason/tests";
import { ManagedObject } from ".";

Test.define("ManagedObject has a unique id per instance", () => {
  const instance1 = new ManagedObject();
  const instance2 = new ManagedObject();

  Test.assert(instance1.id != null);
  Test.assert(instance1.id.length === 8);

  Test.assert(instance2.id != null);
  Test.assert(instance2.id.length === 8);

  Test.assert(instance1.id !== instance2.id);
});

Test.define(
  "ManagedObject invokes initManagedObject when init is called",
  () => {
    let didInit = false as boolean;

    class MySubclass extends ManagedObject {
      initManagedObject() {
        didInit = true;
      }
    }

    const instance = new MySubclass();
    instance.init();

    Test.assert(didInit === true);
    Test.assert(instance.isInitialized.value === true);

    instance.uninit();
  }
);

Test.define("ManagedObject only invokes initManagedObject once", () => {
  let initCount: number = 0;

  class MySubclass extends ManagedObject {
    initManagedObject() {
      initCount += 1;
    }
  }

  const instance = new MySubclass();
  instance.init();
  instance.init();
  instance.init();

  Test.assert(initCount === 1);

  instance.uninit();
});

Test.define("ManagedObject returns a receipt from init", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const instance = new MySubclass();
  const receipt = instance.init();

  Test.assert(receipt != null);
  Test.assert(receipt.isCancelled === false);

  instance.uninit();
});

Test.define(
  "ManagedObject returns the same receipt if init is called multiple times",
  () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const instance = new MySubclass();
    const receipt1 = instance.init();
    const receipt2 = instance.init();
    const receipt3 = instance.init();

    Test.assert(receipt1 != null);
    Test.assert(receipt1 === receipt2);
    Test.assert(receipt1 === receipt3);

    instance.uninit();
  }
);

Test.define(
  "ManagedObject is uninitialized when the receipt is cancelled",
  () => {
    let releaseCount: number = 0;

    class MySubclass extends ManagedObject {
      initManagedObject() {
        this.addReceipt(
          Receipt.givenCancelFunction(() => {
            releaseCount += 1;
          })
        );
      }
    }

    const instance = new MySubclass();
    const receipt1 = instance.init();
    Test.assert(instance.isInitialized.value === true);

    Test.assert(releaseCount === 0);
    receipt1.cancel();
    receipt1.cancel();

    Test.assert(releaseCount === 1); // second release has no effect

    // @ts-ignore
    Test.assert(instance.isInitialized.value === false);

    const receipt2 = instance.init(); // init again
    Test.assert(instance.isInitialized.value === true);

    Test.assert(receipt2 != null);
    Test.assert(receipt1 !== receipt2); // different receipt from the first init

    receipt2.cancel();

    Test.assert(releaseCount === 2);
    Test.assert(instance.isInitialized.value === false);
  }
);

Test.define("ManagedObject has a list of child objects", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const parentInstance = new MySubclass();
  parentInstance.init();

  Test.assert(parentInstance.childObjects.toValues() != null);
  Test.assert(parentInstance.childObjects.toValues().length === 0);

  parentInstance.uninit();
});

Test.define("ManagedObject initializes objects when added as children", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const parentInstance = new MySubclass();
  parentInstance.init();

  const childInstance = new MySubclass();
  Test.assert(childInstance.isInitialized.value === false);

  parentInstance.addManagedObject(childInstance);

  Test.assert(childInstance.isInitialized.value === true);

  parentInstance.uninit();
});

Test.define(
  "ManagedObject sets parent of objects when added as children",
  () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const parentInstance = new MySubclass();
    parentInstance.init();

    const childInstance = new MySubclass();
    Test.assert(childInstance.parentObject.value == null);

    parentInstance.addManagedObject(childInstance);
    Test.assert(childInstance.parentObject.value === parentInstance);

    parentInstance.uninit();
  }
);

Test.define(
  "ManagedObject unsets parent of objects when removed as children",
  () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const parentInstance = new MySubclass();
    parentInstance.init();

    const childInstance = new MySubclass();
    parentInstance.addManagedObject(childInstance);
    parentInstance.removeManagedObject(childInstance);

    Test.assert(childInstance.parentObject.value == null);

    parentInstance.uninit();
  }
);

Test.define(
  "ManagedObject removes objects from other parents when added as children",
  () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const parentInstance1 = new MySubclass();
    const parentInstance2 = new MySubclass();

    parentInstance1.init();
    parentInstance2.init();

    const childInstance = new MySubclass();
    parentInstance1.addManagedObject(childInstance);
    Test.assert(childInstance.parentObject.value === parentInstance1);
    Test.assert(parentInstance1.childObjects.hasValue(childInstance));
    Test.assert(!parentInstance2.childObjects.hasValue(childInstance));

    parentInstance2.addManagedObject(childInstance);
    Test.assert(childInstance.parentObject.value === parentInstance2);
    Test.assert(parentInstance2.childObjects.hasValue(childInstance)); // added
    Test.assert(!parentInstance1.childObjects.hasValue(childInstance)); // removed

    parentInstance1.uninit();
    parentInstance2.uninit();
  }
);

Test.define("ManagedObject uninits child objects when uninit is called", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const parentInstance1 = new MySubclass();
  parentInstance1.init();

  const childInstance = new MySubclass();
  parentInstance1.addManagedObject(childInstance);
  Test.assert(childInstance.isInitialized.value === true);

  parentInstance1.uninit();

  Test.assert(childInstance.isInitialized.value === false);
});

Test.define("ManagedObject inits child objects when init is called", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const parentInstance1 = new MySubclass();
  const childInstance = new MySubclass();
  parentInstance1.addManagedObject(childInstance);
  Test.assert(childInstance.isInitialized.value === false); // parent is not initialized yet

  parentInstance1.init();

  Test.assert(childInstance.isInitialized.value === true);

  parentInstance1.uninit();
});

Test.define("ManagedObject updates the static initialized set", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const startValue = ManagedObject.initializedSet.count;

  const parentInstance1 = new MySubclass();
  const childInstance = new MySubclass();
  parentInstance1.addManagedObject(childInstance);
  parentInstance1.init();

  Test.assert(ManagedObject.initializedSet.count === startValue + 2);

  parentInstance1.uninit();

  Test.assert(ManagedObject.initializedSet.count === startValue);
});
