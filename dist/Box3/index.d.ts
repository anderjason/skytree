import { Size3 } from "../Size3";
import { Point3 } from "../Point3";
export declare class Box3 {
    readonly center: Point3;
    readonly size: Size3;
    static givenCenterSize(center: Point3, size: Size3): Box3;
    static givenCorners(pointA: Point3, pointB: Point3): Box3;
    static isEqual(a: Box3, b: Box3): boolean;
    private constructor();
    get top(): number;
    get left(): number;
    get right(): number;
    get bottom(): number;
    get front(): number;
    get back(): number;
    containsPoint(point: Point3): boolean;
    isEqual(other: Box3): boolean;
}
