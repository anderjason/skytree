import { Point2 } from "../Point2";
import { Size2, ScaleMode } from "../Size2";
declare type Anchor2 = "leftTop" | "centerTop" | "rightTop" | "leftCenter" | "center" | "rightCenter" | "leftBottom" | "centerBottom" | "rightBottom";
export declare class Box2 {
    readonly center: Point2;
    readonly size: Size2;
    static givenCenterSize(center: Point2, size: Size2): Box2;
    static givenOppositeCorners(pointA: Point2, pointB: Point2): Box2;
    static givenTopLeftSize(topLeft: Point2, size: Size2): Box2;
    static givenContainedPoints(points: Point2[]): Box2;
    static isEqual(a: Box2, b: Box2): boolean;
    private constructor();
    get top(): number;
    get left(): number;
    get right(): number;
    get bottom(): number;
    get leftTop(): Point2;
    get centerTop(): Point2;
    get rightTop(): Point2;
    get leftCenter(): Point2;
    get rightCenter(): Point2;
    get leftBottom(): Point2;
    get centerBottom(): Point2;
    get rightBottom(): Point2;
    containsPoint(point: Point2): boolean;
    isEqual(other: Box2): boolean;
    withAvailableSize(availableSize: Size2, scaleMode: ScaleMode, anchor: Anchor2): Box2;
}
export {};
