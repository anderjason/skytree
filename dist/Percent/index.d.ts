import { Ratio } from "../Ratio";
export declare class Percent {
    private _value;
    static givenNumber(value: number): Percent;
    static givenRatio(ratio: Ratio): Percent;
    static givenString(value: string): Percent;
    private constructor();
    toString(fractionDigits?: number): string;
    toRatio(): Ratio;
    toNumber(): number;
}
