export declare class Point2 {
    protected _x: number;
    protected _y: number;
    static ofXY(x: number, y: number): Point2;
    protected constructor(x: number, y: number);
    get x(): number;
    get y(): number;
    toClone(): Point2;
    isEqual(other: Point2): boolean;
}
