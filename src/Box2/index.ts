import { Point2 } from "../Point2";
import { Size2 } from "../Size2";

export class Box2 {
  readonly center: Point2;
  readonly size: Size2;

  static ofCenterSize(center: Point2, size: Size2): Box2 {
    return new Box2(center, size);
  }

  static ofCorners(pointA: Point2, pointB: Point2): Box2 {
    const minX = Math.min(pointA.x, pointB.x);
    const minY = Math.min(pointA.y, pointB.y);

    const maxX = Math.max(pointA.x, pointB.x);
    const maxY = Math.max(pointA.y, pointB.y);

    const size = Size2.ofWidthHeight(maxX - minX, maxY - minY);
    const center = Point2.ofXY(minX + size.width / 2, minY + size.height / 2);

    return this.ofCenterSize(center, size);
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
