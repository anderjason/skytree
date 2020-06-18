import { Size3 } from "../Size3";
import { Point3 } from "../Point3";

export class Box3 {
  readonly center: Point3;
  readonly size: Size3;

  static givenCenterSize(center: Point3, size: Size3): Box3 {
    return new Box3(center, size);
  }

  static givenCorners(pointA: Point3, pointB: Point3): Box3 {
    const minX = Math.min(pointA.x, pointB.x);
    const minY = Math.min(pointA.y, pointB.y);
    const minZ = Math.min(pointA.z, pointB.z);

    const maxX = Math.max(pointA.x, pointB.x);
    const maxY = Math.max(pointA.y, pointB.y);
    const maxZ = Math.max(pointA.z, pointB.z);

    const size = Size3.givenWidthHeightDepth(
      maxX - minX,
      maxY - minY,
      maxZ - minZ
    );
    const center = Point3.givenXYZ(
      minX + size.width / 2,
      minY + size.height / 2,
      minZ + size.depth / 2
    );

    return this.givenCenterSize(center, size);
  }

  static isEqual(a: Box3, b: Box3): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  private constructor(center: Point3, size: Size3) {
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

  get front(): number {
    return this.center.z + this.size.depth / 2;
  }

  get back(): number {
    return this.center.z - this.size.depth / 2;
  }

  containsPoint(point: Point3): boolean {
    return (
      point.x >= this.left &&
      point.x <= this.right &&
      point.y >= this.top &&
      point.y <= this.bottom &&
      point.z <= this.front &&
      point.z >= this.back
    );
  }

  isEqual(other: Box3): boolean {
    if (other == null) {
      return false;
    }

    return other.center.isEqual(this.center) && other.size.isEqual(this.size);
  }
}
