import { Point2 } from "../Point2";
import { Size2 } from "../Size2";
export declare class Box2 {
    readonly center: Point2;
    readonly size: Size2;
    static givenCenterSize(center: Point2, size: Size2): Box2;
    static givenOppositeCorners(pointA: Point2, pointB: Point2): Box2;
    static givenTopLeftSize(topLeft: Point2, size: Size2): Box2;
    static isEqual(a: Box2, b: Box2): boolean;
    private constructor();
    get top(): number;
    get left(): number;
    get right(): number;
    get bottom(): number;
    containsPoint(point: Point2): boolean;
    isEqual(other: Box2): boolean;
}
