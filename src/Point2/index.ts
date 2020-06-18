export class Point2 {
  protected _x: number;
  protected _y: number;

  static givenXY(x: number, y: number): Point2 {
    return new Point2(x, y);
  }

  static ofZero(): Point2 {
    return new Point2(0, 0);
  }

  static isEqual(a: Point2, b: Point2): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
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

  isEqual(other: Point2): boolean {
    if (other == null) {
      return false;
    }

    return other._x == this._x && other._y == this._y;
  }

  toClone(): Point2 {
    return new Point2(this._x, this._y);
  }

  toAngleGivenPoint(other: Point2): number {
    const diff = this.toDeltaGivenPoint(other);

    return Math.atan2(diff.y, diff.x);
  }

  toDeltaGivenPoint(other: Point2): Point2 {
    return new Point2(this.x - other.x, this.y - other.y);
  }

  toDistanceGivenPoint(other: Point2): number {
    const diff = this.toDeltaGivenPoint(other);

    return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
  }

  toMidpointGivenPoint(other: Point2): Point2 {
    const x = this.x + (other.x - this.x) / 2;
    const y = this.y + (other.y - this.y) / 2;

    return new Point2(x, y);
  }

  withAngleAndDistance(angle: number, distance: number): Point2 {
    // Rotate the angle based on the browser coordinate system ([0,0] in the top left)
    const angleRotated = angle + Math.PI / 2;

    const x = this.x + Math.sin(angleRotated) * distance;
    const y = this.y - Math.cos(angleRotated) * distance;

    return new Point2(x, y);
  }
}
