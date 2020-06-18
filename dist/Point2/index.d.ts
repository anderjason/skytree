export declare class Point2 {
    protected _x: number;
    protected _y: number;
    static givenXY(x: number, y: number): Point2;
    static ofZero(): Point2;
    static isEqual(a: Point2, b: Point2): boolean;
    protected constructor(x: number, y: number);
    get x(): number;
    get y(): number;
    isEqual(other: Point2): boolean;
    toClone(): Point2;
    toAngleGivenPoint(other: Point2): number;
    toDeltaGivenPoint(other: Point2): Point2;
    toDistanceGivenPoint(other: Point2): number;
    toMidpointGivenPoint(other: Point2): Point2;
    withAngleAndDistance(angle: number, distance: number): Point2;
}
