import { Percent } from "../Percent";
export declare class Ratio {
    private _value;
    static givenDecimal(decimalValue: number): Ratio;
    static givenFraction(numerator: number, denominator: number): Ratio;
    static givenValueAndRange(value: number, min: number, max: number): Ratio;
    static givenPercent(percent: Percent): Ratio;
    private constructor();
    toDecimal(): number;
    toPercent(): Percent;
    toString(): string;
    withAddedRatio(addRatio: Ratio): Ratio;
    withAddedDecimal(decimal: number): Ratio;
    withMultipliedRatio(multiplyRatio: Ratio): Ratio;
    withMultipliedDecimal(decimal: number): Ratio;
}
