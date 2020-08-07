import { Observable } from "../Observable";

export class Handle {
  static readonly unreleasedCount = Observable.givenValue<number>(0);

  static givenCallback(callback: () => void): Handle {
    this.unreleasedCount.setValue(this.unreleasedCount.value + 1);

    return new Handle(callback);
  }

  private _callback: (() => void) | undefined;

  private constructor(callback: () => void) {
    this._callback = callback;
  }

  get isReleased(): boolean {
    return this._callback == null;
  }

  release = (): void => {
    if (this._callback == null) {
      return;
    }

    const fn = this._callback;
    this._callback = undefined;

    fn();

    Handle.unreleasedCount.setValue(Handle.unreleasedCount.value - 1);

    return;
  };
}
