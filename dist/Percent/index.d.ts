import { Ratio } from "../Ratio";
export declare class Percent {
    private _value;
    static isEqual(a: Percent, b: Percent): boolean;
    static givenNumber(value: number): Percent;
    static givenRatio(ratio: Ratio): Percent;
    static givenString(value: string): Percent;
    static ofZero(): Percent;
    private constructor();
    isEqual(other: Percent): boolean;
    toString(fractionDigits?: number): string;
    toRatio(): Ratio;
    toNumber(): number;
}
