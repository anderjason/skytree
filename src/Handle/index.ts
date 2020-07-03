export class Handle {
  private static _unreleasedCount: number = 0;

  static getUnreleasedCount(): number {
    return this._unreleasedCount;
  }

  private _releaseFn: (() => void) | undefined;

  static givenReleaseFunction(release: () => void): Handle {
    this._unreleasedCount += 1;

    return new Handle(release);
  }

  private constructor(release: () => void) {
    this._releaseFn = release;
  }

  get isReleased(): boolean {
    return this._releaseFn == null;
  }

  release = (): void => {
    if (this._releaseFn == null) {
      return;
    }

    this._releaseFn();
    this._releaseFn = undefined;

    Handle._unreleasedCount -= 1;

    return;
  };
}
