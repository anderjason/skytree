import { Point2 } from "../Point2";
import { Size2 } from "../Size2";

export class Box2 {
  readonly center: Point2;
  readonly size: Size2;

  static givenCenterSize(center: Point2, size: Size2): Box2 {
    return new Box2(center, size);
  }

  static givenOppositeCorners(pointA: Point2, pointB: Point2): Box2 {
    const minX = Math.min(pointA.x, pointB.x);
    const minY = Math.min(pointA.y, pointB.y);

    const maxX = Math.max(pointA.x, pointB.x);
    const maxY = Math.max(pointA.y, pointB.y);

    const size = Size2.givenWidthHeight(maxX - minX, maxY - minY);
    const center = Point2.givenXY(
      minX + size.width / 2,
      minY + size.height / 2
    );

    return this.givenCenterSize(center, size);
  }

  static givenTopLeftSize(topLeft: Point2, size: Size2): Box2 {
    const center = Point2.givenXY(
      topLeft.x + size.width / 2,
      topLeft.y + size.height / 2
    );

    return this.givenCenterSize(center, size);
  }

  static isEqual(newValue: Box2, oldValue: Box2): boolean {
    if (newValue == null || oldValue == null) {
      return false;
    }

    return newValue.isEqual(oldValue);
  }

  private constructor(center: Point2, size: Size2) {
    this.center = center;
    this.size = size;
  }

  get top(): number {
    return this.center.y - this.size.height / 2;
  }

  get left(): number {
    return this.center.x - this.size.width / 2;
  }

  get right(): number {
    return this.center.x + this.size.width / 2;
  }

  get bottom(): number {
    return this.center.y + this.size.height / 2;
  }

  containsPoint(point: Point2): boolean {
    return (
      point.x >= this.left &&
      point.x <= this.right &&
      point.y >= this.top &&
      point.y <= this.bottom
    );
  }

  isEqual(other: Box2): boolean {
    if (other == null) {
      return false;
    }

    return other.center.isEqual(this.center) && other.size.isEqual(this.size);
  }
}
