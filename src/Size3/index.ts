export class Size3 {
  static givenWidthHeightDepth(
    width: number,
    height: number,
    depth: number
  ): Size3 {
    return new Size3(width, height, depth);
  }

  static ofZero(): Size3 {
    return new Size3(0, 0, 0);
  }

  static isEqual(a: Size3, b: Size3): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  protected _width: number;
  protected _height: number;
  protected _depth: number;

  protected constructor(width: number, height: number, depth: number) {
    this._width = width;
    this._height = height;
    this._depth = depth;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get depth(): number {
    return this._depth;
  }

  toClone() {
    return new Size3(this._width, this._height, this._depth);
  }

  isEqual(other: Size3): boolean {
    if (other == null) {
      return false;
    }

    return (
      other._width == this._width &&
      other._height == this._height &&
      other._depth == this._depth
    );
  }
}
