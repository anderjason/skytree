import { Test } from "../Test";
import { ManagedObject } from ".";
import { Handle } from "../Handle";

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
    Test.assert(instance.isInitialized === true);

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

Test.define("ManagedObject returns a handle from init", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const instance = new MySubclass();
  const handle = instance.init();

  Test.assert(handle != null);
  Test.assert(handle.isReleased === false);

  instance.uninit();
});

Test.define(
  "ManagedObject returns the same handle if init is called multiple times",
  () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const instance = new MySubclass();
    const handle1 = instance.init();
    const handle2 = instance.init();
    const handle3 = instance.init();

    Test.assert(handle1 != null);
    Test.assert(handle1 === handle2);
    Test.assert(handle1 === handle3);

    instance.uninit();
  }
);

Test.define("ManagedObject is reset when the handle is released", () => {
  let releaseCount: number = 0;

  class MySubclass extends ManagedObject {
    initManagedObject() {
      this.addHandle(
        Handle.givenCallback(() => {
          releaseCount += 1;
        })
      );
    }
  }

  const instance = new MySubclass();
  const handle1 = instance.init();
  Test.assert(instance.isInitialized === true);

  Test.assert(releaseCount === 0);
  handle1.release();
  handle1.release();

  // @ts-ignore
  Test.assert(releaseCount === 1); // second release has no effect

  // @ts-ignore
  Test.assert(instance.isInitialized === false);

  const handle2 = instance.init(); // init again
  Test.assert(instance.isInitialized === true);

  Test.assert(handle2 != null);
  Test.assert(handle1 !== handle2); // different handle from the first init

  handle2.release();

  // @ts-ignore
  Test.assert(releaseCount === 2);

  // @ts-ignore
  Test.assert(instance.isInitialized === false);
});

Test.define("ManagedObject has a list of child objects", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const parentInstance = new MySubclass();
  parentInstance.init();

  Test.assert(parentInstance.children != null);
  Test.assert(parentInstance.children.length === 0);

  parentInstance.uninit();
});

Test.define("ManagedObject initializes objects when added as children", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const parentInstance = new MySubclass();
  parentInstance.init();

  const childInstance = new MySubclass();
  Test.assert(childInstance.isInitialized === false);

  parentInstance.addManagedObject(childInstance);

  // @ts-ignore
  Test.assert(childInstance.isInitialized === true);

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
    Test.assert(childInstance.parent == null);

    parentInstance.addManagedObject(childInstance);
    Test.assert(childInstance.parent === parentInstance);

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

    Test.assert(childInstance.parent == null);

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
    Test.assert(childInstance.parent === parentInstance1);
    Test.assert(parentInstance1.children.includes(childInstance));
    Test.assert(!parentInstance2.children.includes(childInstance));

    parentInstance2.addManagedObject(childInstance);
    Test.assert(childInstance.parent === parentInstance2);
    Test.assert(parentInstance2.children.includes(childInstance)); // added
    Test.assert(!parentInstance1.children.includes(childInstance)); // removed

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
  Test.assert(childInstance.isInitialized === true);

  parentInstance1.uninit();

  // @ts-ignore
  Test.assert(childInstance.isInitialized === false);
});

Test.define("ManagedObject inits child objects when init is called", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const parentInstance1 = new MySubclass();
  const childInstance = new MySubclass();
  parentInstance1.addManagedObject(childInstance);
  Test.assert(childInstance.isInitialized === false); // parent is not initialized yet

  parentInstance1.init();

  // @ts-ignore
  Test.assert(childInstance.isInitialized === true);

  parentInstance1.uninit();
});

Test.define("ManagedObject updates the static initialized count", () => {
  class MySubclass extends ManagedObject {
    initManagedObject() {}
  }

  const startValue = ManagedObject.initializedCount.value;

  const parentInstance1 = new MySubclass();
  const childInstance = new MySubclass();
  parentInstance1.addManagedObject(childInstance);
  parentInstance1.init();

  Test.assert(ManagedObject.initializedCount.value === startValue + 2);

  parentInstance1.uninit();

  Test.assert(ManagedObject.initializedCount.value === startValue);
});
