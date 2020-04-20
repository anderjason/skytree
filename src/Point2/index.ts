export class Point2 {
  protected _x: number;
  protected _y: number;

  static ofXY(x: number, y: number): Point2 {
    return new Point2(x, y);
  }

  protected constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  toClone(): Point2 {
    return new Point2(this._x, this._y);
  }

  isEqual(other: Point2): boolean {
    if (other == null) {
      return false;
    }

    return other._x == this._x && other._y == this._y;
  }
}
