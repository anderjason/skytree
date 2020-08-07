import { Test, assert } from "../Test";
import { Handle } from ".";

Test.define("Handle is not released by default", () => {
  const handle = Handle.givenCallback(() => {});
  assert(!handle.isReleased);

  handle.release();
});

Test.define("Handle is released after calling release", () => {
  const handle = Handle.givenCallback(() => {});
  handle.release();
  assert(handle.isReleased);
});

Test.define("Handle invokes the release function when calling release", () => {
  let didRelease = false as boolean;

  const handle = Handle.givenCallback(() => {
    didRelease = true;
  });

  handle.release();

  assert(didRelease === true);
});

Test.define("Handle only invokes the release function once", () => {
  let releaseCount: number = 0;

  const handle = Handle.givenCallback(() => {
    releaseCount += 1;
  });

  handle.release();
  handle.release();
  handle.release();

  assert(releaseCount === 1);
});
