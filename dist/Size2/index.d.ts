export declare class Size2 {
    protected _width: number;
    protected _height: number;
    static ofWidthHeight(width: number, height: number): Size2;
    protected constructor(width: number, height: number);
    get width(): number;
    get height(): number;
    toClone(): Size2;
    isEqual(other: Size2): boolean;
}
