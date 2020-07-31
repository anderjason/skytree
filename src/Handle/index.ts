import { Observable } from "../Observable";

export class Handle {
  static readonly unreleasedCount = Observable.givenValue<number>(0);

  static givenReleaseFunction(release: () => void): Handle {
    this.unreleasedCount.setValue(this.unreleasedCount.value + 1);

    return new Handle(release);
  }

  private _releaseFn: (() => void) | undefined;

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

    const fn = this._releaseFn;
    this._releaseFn = undefined;

    fn();

    Handle.unreleasedCount.setValue(Handle.unreleasedCount.value - 1);

    return;
  };
}
