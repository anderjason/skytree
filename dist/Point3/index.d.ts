export declare class Point3 {
    protected _x: number;
    protected _y: number;
    protected _z: number;
    static givenXYZ(x: number, y: number, z: number): Point3;
    static ofZero(): Point3;
    static isEqual(a: Point3, b: Point3): boolean;
    protected constructor(x: number, y: number, z: number);
    get x(): number;
    get y(): number;
    get z(): number;
    toClone(): Point3;
    isEqual(other: Point3): boolean;
}
