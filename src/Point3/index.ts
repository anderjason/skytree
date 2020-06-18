export class Point3 {
  protected _x: number;
  protected _y: number;
  protected _z: number;

  static givenXYZ(x: number, y: number, z: number): Point3 {
    return new Point3(x, y, z);
  }

  static ofZero(): Point3 {
    return new Point3(0, 0, 0);
  }

  static isEqual(a: Point3, b: Point3): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  protected constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get z(): number {
    return this._z;
  }

  toClone(): Point3 {
    return new Point3(this._x, this._y, this._z);
  }

  isEqual(other: Point3): boolean {
    if (other == null) {
      return false;
    }

    return other._x == this._x && other._y == this._y && other._z == this._z;
  }
}
