import "mocha";
import * as assert from "assert";
import { ManagedObject } from ".";
import { Handle } from "../Handle";

describe("ManagedObject", () => {
  it("has a unique id per instance", () => {
    const instance1 = new ManagedObject();
    const instance2 = new ManagedObject();

    assert(instance1.id != null);
    assert(instance1.id.length === 8);

    assert(instance2.id != null);
    assert(instance2.id.length === 8);

    assert(instance1.id !== instance2.id);
  });

  it("invokes initManagedObject when init is called", () => {
    let didInit = false as boolean;

    class MySubclass extends ManagedObject {
      initManagedObject() {
        didInit = true;
      }
    }

    const instance = new MySubclass();
    instance.init();

    assert(didInit === true);
    assert(instance.isInitialized === true);
  });

  it("only invokes initManagedObject once", () => {
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

    assert(initCount === 1);
  });

  it("returns a handle from init", () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const instance = new MySubclass();
    const handle = instance.init();

    assert(handle != null);
    assert(handle.isReleased === false);
  });

  it("returns the same handle if init is called multiple times", () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const instance = new MySubclass();
    const handle1 = instance.init();
    const handle2 = instance.init();
    const handle3 = instance.init();

    assert(handle1 != null);
    assert(handle1 === handle2);
    assert(handle1 === handle3);
  });

  it("is reset when the handle is released", () => {
    let releaseCount: number = 0;

    class MySubclass extends ManagedObject {
      initManagedObject() {
        this.addHandle(
          Handle.givenReleaseFunction(() => {
            releaseCount += 1;
          })
        );
      }
    }

    const instance = new MySubclass();
    const handle1 = instance.init();
    assert(instance.isInitialized === true);

    assert(releaseCount === 0);
    handle1.release();
    handle1.release();

    // @ts-ignore
    assert(releaseCount === 1); // second release has no effect

    // @ts-ignore
    assert(instance.isInitialized === false);

    const handle2 = instance.init(); // init again
    assert(instance.isInitialized === true);

    assert(handle2 != null);
    assert(handle1 !== handle2); // different handle from the first init

    handle2.release();

    // @ts-ignore
    assert(releaseCount === 2);

    // @ts-ignore
    assert(instance.isInitialized === false);
  });

  it("has a list of child objects", () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const parentInstance = new MySubclass();
    parentInstance.init();

    assert(parentInstance.children != null);
    assert(parentInstance.children.length === 0);
  });

  it("initializes objects when added as children", () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const parentInstance = new MySubclass();
    parentInstance.init();

    const childInstance = new MySubclass();
    assert(childInstance.isInitialized === false);

    parentInstance.addManagedObject(childInstance);

    // @ts-ignore
    assert(childInstance.isInitialized === true);
  });

  it("sets parent of objects when added as children", () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const parentInstance = new MySubclass();
    parentInstance.init();

    const childInstance = new MySubclass();
    assert(childInstance.parent == null);

    parentInstance.addManagedObject(childInstance);
    assert(childInstance.parent === parentInstance);
  });

  it("unsets parent of objects when removed as children", () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const parentInstance = new MySubclass();
    parentInstance.init();

    const childInstance = new MySubclass();
    parentInstance.addManagedObject(childInstance);
    parentInstance.removeManagedObject(childInstance);

    assert(childInstance.parent == null);
  });

  it("removes objects from other parents when added as children", () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const parentInstance1 = new MySubclass();
    const parentInstance2 = new MySubclass();

    parentInstance1.init();
    parentInstance2.init();

    const childInstance = new MySubclass();
    parentInstance1.addManagedObject(childInstance);
    assert(childInstance.parent === parentInstance1);
    assert(parentInstance1.children.includes(childInstance));
    assert(!parentInstance2.children.includes(childInstance));

    parentInstance2.addManagedObject(childInstance);
    assert(childInstance.parent === parentInstance2);
    assert(parentInstance2.children.includes(childInstance)); // added
    assert(!parentInstance1.children.includes(childInstance)); // removed
  });

  it("uninits child objects when uninit is called", () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const parentInstance1 = new MySubclass();
    parentInstance1.init();

    const childInstance = new MySubclass();
    parentInstance1.addManagedObject(childInstance);
    assert(childInstance.isInitialized === true);

    parentInstance1.uninit();

    // @ts-ignore
    assert(childInstance.isInitialized === false);
  });

  it("inits child objects when init is called", () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const parentInstance1 = new MySubclass();
    const childInstance = new MySubclass();
    parentInstance1.addManagedObject(childInstance);
    assert(childInstance.isInitialized === false); // parent is not initialized yet

    parentInstance1.init();

    // @ts-ignore
    assert(childInstance.isInitialized === true);
  });

  it("updates the static initialized count", () => {
    class MySubclass extends ManagedObject {
      initManagedObject() {}
    }

    const startValue = ManagedObject.initializedCount.value;

    const parentInstance1 = new MySubclass();
    const childInstance = new MySubclass();
    parentInstance1.addManagedObject(childInstance);
    parentInstance1.init();

    assert.strictEqual(ManagedObject.initializedCount.value, startValue + 2);

    parentInstance1.uninit();

    assert.strictEqual(ManagedObject.initializedCount.value, startValue);
  });
});
