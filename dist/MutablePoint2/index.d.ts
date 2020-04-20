import { Point2 } from "../Point2";
export declare class MutablePoint2 extends Point2 {
    static ofXY(x: number, y: number): MutablePoint2;
    static ofPoint2(point: Point2): MutablePoint2;
    private constructor();
    set x(value: number);
    set y(value: number);
    toClone(): MutablePoint2;
}
