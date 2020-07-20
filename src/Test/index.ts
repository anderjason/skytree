import { PromiseUtil } from "../PromiseUtil";

let currentAssertionIndex: number = 0;

export function assert(value: boolean, failedMessage?: string): void {
  currentAssertionIndex += 1;

  if (!value) {
    throw new Error(
      failedMessage || `Assertion ${currentAssertionIndex} failed`
    );
  }
}

export async function assertThrows(
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

  static async runAll(): Promise<void> {
    await PromiseUtil.promiseOfSequentialActions(
      Test._allTests,
      async (test) => {
        await test.toPromise();
      }
    );
  }

  private _label: string;
  private _fn: () => Promise<any> | void;

  private constructor(label: string, fn: () => Promise<any> | void) {
    this._label = label;
    this._fn = fn;
  }

  async toPromise(): Promise<void> {
    currentAssertionIndex = 0;

    console.log(this._label);
    await this._fn();
  }
}