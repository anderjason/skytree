import { Ratio } from "../Ratio";
export declare class Percent {
    private _value;
    static ofNumber(value: number): Percent;
    static ofRatio(ratio: Ratio): Percent;
    static ofString(value: string): Percent;
    private constructor();
    toString(fractionDigits?: number): string;
    toRatio(): Ratio;
    toNumber(): number;
}
