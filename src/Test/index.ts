import { PromiseUtil } from "../PromiseUtil";
import { ObjectUtil } from "../ObjectUtil";
import { Handle } from "../Handle";
import { ManagedObject } from "../ManagedObject";

let currentAssertionIndex: number = 0;

function assert(value: boolean, failedMessage?: string): void {
  currentAssertionIndex += 1;

  if (!value) {
    throw new Error(
      failedMessage || `Assertion ${currentAssertionIndex} failed`
    );
  }
}

function assertIsDeepEqual(
  actual: any,
  expected: any,
  failedMessage?: string
): void {
  currentAssertionIndex += 1;

  if (!ObjectUtil.objectIsDeepEqual(actual, expected)) {
    throw new Error(
      failedMessage || `Assertion ${currentAssertionIndex} failed`
    );
  }
}

async function assertThrows(
  fn: () => any,
  failedMessage?: string
): Promise<void> {
  currentAssertionIndex += 1;

  try {
    await fn();

    // fn is expected to throw, so if we get here, it's an error
    throw new Error(
      failedMessage || `Assertion ${currentAssertionIndex} failed`
    );
  } catch {
    // OK
  }
}

export class Test {
  private static _allTests: Test[] = [];

  static define(label: string, fn: () => Promise<any> | void): void {
    if (label == null) {
      throw new Error("label is required");
    }

    if (fn == null) {
      throw new Error("fn is required");
    }

    Test._allTests.push(new Test(label, fn));
  }

  static assert = assert;
  static assertThrows = assertThrows;
  static assertIsDeepEqual = assertIsDeepEqual;

  static async runAll(): Promise<void> {
    await PromiseUtil.promiseOfSequentialActions(
      Test._allTests,
      async (test) => {
        const unreleasedHandlesBefore = Handle.unreleasedCount.value;
        const managedObjectsBefore = ManagedObject.initializedCount.value;

        await test.toPromise();

        const unreleasedHandlesAfter = Handle.unreleasedCount.value;
        const managedObjectsAfter = ManagedObject.initializedCount.value;

        if (managedObjectsBefore !== managedObjectsAfter) {
          throw new Error(
            `Some managed objects are still initialized after test '${test.label}' (before ${managedObjectsBefore}, after ${managedObjectsAfter})`
          );
        }

        if (unreleasedHandlesBefore !== unreleasedHandlesAfter) {
          throw new Error(
            `Some handles were not released after test '${test.label}' (before ${unreleasedHandlesBefore}, after ${unreleasedHandlesAfter})`
          );
        }
      }
    );
  }

  readonly label: string;

  private _fn: () => Promise<any> | void;

  private constructor(label: string, fn: () => Promise<any> | void) {
    this.label = label;
    this._fn = fn;
  }

  async toPromise(): Promise<void> {
    currentAssertionIndex = 0;

    console.log(this.label);
    await this._fn();
  }
}
