export declare class Size3 {
    protected _width: number;
    protected _height: number;
    protected _depth: number;
    static ofWidthHeightDepth(width: number, height: number, depth: number): Size3;
    static ofZero(): Size3;
    protected constructor(width: number, height: number, depth: number);
    get width(): number;
    get height(): number;
    get depth(): number;
    toClone(): Size3;
    equals(other: Size3): boolean;
}
