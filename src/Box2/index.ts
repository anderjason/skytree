import { Point2 } from "../Point2";
import { Size2, ScaleMode } from "../Size2";

export type Anchor2 =
  | "leftTop"
  | "centerTop"
  | "rightTop"
  | "leftCenter"
  | "center"
  | "rightCenter"
  | "leftBottom"
  | "centerBottom"
  | "rightBottom";

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

  static givenContainedPoints(points: Point2[]): Box2 {
    const allX = points.map((point) => point.x);
    const allY = points.map((point) => point.y);

    const minX = Math.min(...allX);
    const minY = Math.min(...allY);

    const maxX = Math.max(...allX);
    const maxY = Math.max(...allY);

    return Box2.givenOppositeCorners(
      Point2.givenXY(minX, minY),
      Point2.givenXY(maxX, maxY)
    );
  }

  static isEqual(a: Box2, b: Box2): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
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

  get leftTop(): Point2 {
    return Point2.givenXY(this.left, this.top);
  }

  get centerTop(): Point2 {
    return Point2.givenXY(this.center.x, this.top);
  }

  get rightTop(): Point2 {
    return Point2.givenXY(this.right, this.top);
  }

  get leftCenter(): Point2 {
    return Point2.givenXY(this.left, this.center.y);
  }

  get rightCenter(): Point2 {
    return Point2.givenXY(this.right, this.center.y);
  }

  get leftBottom(): Point2 {
    return Point2.givenXY(this.left, this.bottom);
  }

  get centerBottom(): Point2 {
    return Point2.givenXY(this.center.x, this.bottom);
  }

  get rightBottom(): Point2 {
    return Point2.givenXY(this.right, this.bottom);
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

  withBoundingBox(
    boundingBox: Box2,
    scaleMode: ScaleMode,
    anchor: Anchor2
  ): Box2 {
    const newSize = this.size.withAvailableSize(boundingBox.size, scaleMode);

    let centerX: number;
    switch (anchor) {
      case "leftTop":
      case "leftCenter":
      case "leftBottom":
        centerX = boundingBox.left + newSize.toHalf().width;
        break;
      case "centerTop":
      case "center":
      case "centerBottom":
        centerX = boundingBox.center.x;
        break;
      case "rightTop":
      case "rightCenter":
      case "rightBottom":
        centerX = boundingBox.right - newSize.toHalf().width;
        break;
    }

    let centerY: number;
    switch (anchor) {
      case "leftTop":
      case "centerTop":
      case "rightTop":
        centerY = boundingBox.top + newSize.toHalf().height;
        break;
      case "leftCenter":
      case "center":
      case "rightCenter":
        centerY = boundingBox.center.y;
        break;
      case "leftBottom":
      case "centerBottom":
      case "rightBottom":
        centerY = boundingBox.bottom - newSize.toHalf().height;
        break;
    }

    return Box2.givenCenterSize(Point2.givenXY(centerX, centerY), newSize);
  }
}
