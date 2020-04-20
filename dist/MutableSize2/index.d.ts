import { Size2 } from "../Size2";
export declare class MutableSize2 extends Size2 {
    static ofWidthHeight(width: number, height: number): MutableSize2;
    static ofSize2(size: Size2): MutableSize2;
    private constructor();
    set width(value: number);
    set height(value: number);
    toClone(): MutableSize2;
}
