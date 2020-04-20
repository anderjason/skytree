import { Size3 } from "../Size3";
import { Point3 } from "../Point3";
export declare class Box3 {
    readonly center: Point3;
    readonly size: Size3;
    static ofCenterSize(center: Point3, size: Size3): Box3;
    static ofCorners(pointA: Point3, pointB: Point3): Box3;
    private constructor();
    get top(): number;
    get left(): number;
    get right(): number;
    get bottom(): number;
    get front(): number;
    get back(): number;
    containsPoint(point: Point3): boolean;
}
