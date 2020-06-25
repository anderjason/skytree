export declare type ScaleMode = "flexible" | "expand" | "shrink";
export declare class Size2 {
    protected _width: number;
    protected _height: number;
    static givenWidthHeight(width: number, height: number): Size2;
    static ofZero(): Size2;
    static isEqual(a: Size2, b: Size2): boolean;
    protected constructor(width: number, height: number);
    get width(): number;
    get height(): number;
    get isZero(): boolean;
    toClone(): Size2;
    isEqual(other: Size2): boolean;
    withAvailableSize(availableSize: Size2, scaleMode: ScaleMode): Size2;
}
