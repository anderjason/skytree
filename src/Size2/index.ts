export class Size2 {
  protected _width: number;
  protected _height: number;

  static ofWidthHeight(width: number, height: number): Size2 {
    return new Size2(width, height);
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

  toClone(): Size2 {
    return new Size2(this._width, this._height);
  }

  isEqual(other: Size2): boolean {
    if (other == null) {
      return false;
    }

    return other._width == this._width && other._height == this._height;
  }
}
