export class Handle {
  private _releaseFn: (() => void) | undefined;

  static givenReleaseFunction(release: () => void): Handle {
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

    return;
  };
}
