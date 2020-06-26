import { Size3 } from "../Size3";
import { Point3 } from "../Point3";
import { ScaleMode } from "../Size2";

export type Anchor3 =
  | "leftTopFront"
  | "centerTopFront"
  | "rightTopFront"
  | "leftCenterFront"
  | "frontCenter"
  | "rightCenterFront"
  | "leftBottomFront"
  | "centerBottomFront"
  | "rightBottomFront"
  | "leftTopCenter"
  | "topCenter"
  | "rightTopCenter"
  | "leftCenter"
  | "center"
  | "rightCenter"
  | "leftBottomCenter"
  | "bottomCenter"
  | "rightBottomCenter"
  | "leftTopBack"
  | "centerTopBack"
  | "rightTopBack"
  | "leftCenterBack"
  | "backCenter"
  | "rightCenterBack"
  | "leftBottomBack"
  | "centerBottomBack"
  | "rightBottomBack";

export class Box3 {
  readonly center: Point3;
  readonly size: Size3;

  static givenCenterSize(center: Point3, size: Size3): Box3 {
    return new Box3(center, size);
  }

  static givenOppositeCorners(pointA: Point3, pointB: Point3): Box3 {
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

  static givenContainedPoints(points: Point3[]): Box3 {
    const allX = points.map((point) => point.x);
    const allY = points.map((point) => point.y);
    const allZ = points.map((point) => point.z);

    const minX = Math.min(...allX);
    const minY = Math.min(...allY);
    const minZ = Math.min(...allZ);

    const maxX = Math.max(...allX);
    const maxY = Math.max(...allY);
    const maxZ = Math.max(...allZ);

    return Box3.givenOppositeCorners(
      Point3.givenXYZ(minX, minY, minZ),
      Point3.givenXYZ(maxX, maxY, maxZ)
    );
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

  get leftTopFront(): Point3 {
    return Point3.givenXYZ(this.left, this.top, this.front);
  }

  get centerTopFront(): Point3 {
    return Point3.givenXYZ(this.center.x, this.top, this.front);
  }

  get rightTopFront(): Point3 {
    return Point3.givenXYZ(this.right, this.top, this.front);
  }

  get leftCenterFront(): Point3 {
    return Point3.givenXYZ(this.left, this.center.y, this.front);
  }

  get frontCenter(): Point3 {
    return Point3.givenXYZ(this.center.x, this.center.y, this.front);
  }

  get rightCenterFront(): Point3 {
    return Point3.givenXYZ(this.right, this.center.y, this.front);
  }

  get leftBottomFront(): Point3 {
    return Point3.givenXYZ(this.left, this.bottom, this.front);
  }

  get centerBottomFront(): Point3 {
    return Point3.givenXYZ(this.center.x, this.bottom, this.front);
  }

  get rightBottomFront(): Point3 {
    return Point3.givenXYZ(this.right, this.bottom, this.front);
  }

  // ---

  get leftTopCenter(): Point3 {
    return Point3.givenXYZ(this.left, this.top, this.center.z);
  }

  get topCenter(): Point3 {
    return Point3.givenXYZ(this.center.x, this.top, this.center.z);
  }

  get rightTopCenter(): Point3 {
    return Point3.givenXYZ(this.right, this.top, this.center.z);
  }

  get leftCenter(): Point3 {
    return Point3.givenXYZ(this.left, this.center.y, this.center.z);
  }

  get rightCenter(): Point3 {
    return Point3.givenXYZ(this.right, this.center.y, this.center.z);
  }

  get leftBottomCenter(): Point3 {
    return Point3.givenXYZ(this.left, this.bottom, this.center.z);
  }

  get bottomCenter(): Point3 {
    return Point3.givenXYZ(this.center.x, this.bottom, this.center.z);
  }

  get rightBottomCenter(): Point3 {
    return Point3.givenXYZ(this.right, this.bottom, this.center.z);
  }

  // ----

  get leftTopBack(): Point3 {
    return Point3.givenXYZ(this.left, this.top, this.back);
  }

  get centerTopBack(): Point3 {
    return Point3.givenXYZ(this.center.x, this.top, this.back);
  }

  get rightTopBack(): Point3 {
    return Point3.givenXYZ(this.right, this.top, this.back);
  }

  get leftCenterBack(): Point3 {
    return Point3.givenXYZ(this.left, this.center.y, this.back);
  }

  get backCenter(): Point3 {
    return Point3.givenXYZ(this.center.x, this.center.y, this.back);
  }

  get rightCenterBack(): Point3 {
    return Point3.givenXYZ(this.right, this.center.y, this.back);
  }

  get leftBottomBack(): Point3 {
    return Point3.givenXYZ(this.left, this.bottom, this.back);
  }

  get centerBottomBack(): Point3 {
    return Point3.givenXYZ(this.center.x, this.bottom, this.back);
  }

  get rightBottomBack(): Point3 {
    return Point3.givenXYZ(this.right, this.bottom, this.back);
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

  withBoundingBox(
    boundingBox: Box3,
    scaleMode: ScaleMode,
    anchor: Anchor3
  ): Box3 {
    const newSize = this.size.withAvailableSize(boundingBox.size, scaleMode);

    let centerX: number;
    switch (anchor) {
      case "leftTopFront":
      case "leftTopCenter":
      case "leftTopBack":
      case "leftCenterFront":
      case "leftCenter":
      case "leftCenterBack":
      case "leftBottomFront":
      case "leftBottomCenter":
      case "leftBottomBack":
        centerX = boundingBox.left + newSize.toHalf().width;
        break;
      case "centerTopFront":
      case "topCenter":
      case "centerTopBack":
      case "frontCenter":
      case "center":
      case "backCenter":
      case "centerBottomFront":
      case "bottomCenter":
      case "centerBottomBack":
        centerX = boundingBox.center.x;
        break;
      case "rightTopFront":
      case "rightTopCenter":
      case "rightTopBack":
      case "rightCenterFront":
      case "rightCenter":
      case "rightCenterBack":
      case "rightBottomFront":
      case "rightBottomCenter":
      case "rightBottomBack":
        centerX = boundingBox.right - newSize.toHalf().width;
        break;
    }

    let centerY: number;
    switch (anchor) {
      case "leftTopFront":
      case "centerTopFront":
      case "rightTopFront":
      case "leftTopCenter":
      case "topCenter":
      case "rightTopCenter":
      case "leftTopBack":
      case "centerTopBack":
      case "rightTopBack":
        centerY = boundingBox.top + newSize.toHalf().height;
        break;
      case "leftCenterFront":
      case "frontCenter":
      case "rightCenterFront":
      case "leftCenter":
      case "center":
      case "rightCenter":
      case "leftCenterBack":
      case "backCenter":
      case "rightCenterBack":
        centerY = boundingBox.center.y;
        break;
      case "leftBottomFront":
      case "centerBottomFront":
      case "rightBottomFront":
      case "leftBottomCenter":
      case "bottomCenter":
      case "rightBottomCenter":
      case "leftBottomBack":
      case "centerBottomBack":
      case "rightBottomBack":
        centerY = boundingBox.bottom - newSize.toHalf().height;
        break;
    }

    let centerZ: number;
    switch (anchor) {
      case "leftTopFront":
      case "centerTopFront":
      case "rightTopFront":
      case "leftCenterFront":
      case "frontCenter":
      case "rightCenterFront":
      case "leftBottomFront":
      case "centerBottomFront":
      case "rightBottomFront":
        centerZ = boundingBox.front - newSize.toHalf().depth;
        break;
      case "leftTopCenter":
      case "topCenter":
      case "rightTopCenter":
      case "leftCenter":
      case "center":
      case "rightCenter":
      case "leftBottomCenter":
      case "bottomCenter":
      case "rightBottomCenter":
        centerZ = boundingBox.center.z;
        break;
      case "leftTopBack":
      case "centerTopBack":
      case "rightTopBack":
      case "leftCenterBack":
      case "backCenter":
      case "rightCenterBack":
      case "leftBottomBack":
      case "centerBottomBack":
      case "rightBottomBack":
        centerZ = boundingBox.back + newSize.toHalf().depth;
        break;
    }

    return Box3.givenCenterSize(
      Point3.givenXYZ(centerX, centerY, centerZ),
      newSize
    );
  }
}
