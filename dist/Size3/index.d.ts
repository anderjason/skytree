export declare class Size3 {
    static givenWidthHeightDepth(width: number, height: number, depth: number): Size3;
    static ofZero(): Size3;
    static isEqual(a: Size3, b: Size3): boolean;
    protected _width: number;
    protected _height: number;
    protected _depth: number;
    protected constructor(width: number, height: number, depth: number);
    get width(): number;
    get height(): number;
    get depth(): number;
    toClone(): Size3;
    isEqual(other: Size3): boolean;
}
