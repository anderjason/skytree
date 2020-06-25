export type ScaleMode = "flexible" | "expand" | "shrink";

export class Size2 {
  protected _width: number;
  protected _height: number;

  static givenWidthHeight(width: number, height: number): Size2 {
    return new Size2(width, height);
  }

  static ofZero(): Size2 {
    return new Size2(0, 0);
  }

  static isEqual(a: Size2, b: Size2): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  protected constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get isZero(): boolean {
    return this._width === 0 || this._height === 0;
  }

  toClone(): Size2 {
    return new Size2(this._width, this._height);
  }

  isEqual(other: Size2): boolean {
    if (other == null) {
      return false;
    }

    return other._width == this._width && other._height == this._height;
  }

  withAvailableSize(availableSize: Size2, scaleMode: ScaleMode): Size2 {
    if (availableSize == null) {
      throw new Error("availableSize is required");
    }

    if (availableSize.isZero || this.isZero) {
      return Size2.ofZero();
    }

    const scaleX = availableSize.width / this._width;
    const scaleY = availableSize.height / this._height;
    const scale = Math.min(scaleX, scaleY);

    if (scale < 1 && scaleMode === "expand") {
      // would shrink, but only expanding is allowed
      return this.toClone();
    }

    if (scale > 1 && scaleMode === "shrink") {
      // would expand, but only shrinking is allowed
      return this.toClone();
    }

    return Size2.givenWidthHeight(this._width * scale, this._height * scale);
  }
}
