import { Size3 } from "../Size3";
export declare class MutableSize3 extends Size3 {
    static ofWidthHeightDepth(width: number, height: number, depth: number): MutableSize3;
    static ofSize3(size: Size3): MutableSize3;
    static ofZero(): MutableSize3;
    private constructor();
    set width(value: number);
    set height(value: number);
    set depth(value: number);
    toClone(): MutableSize3;
}
