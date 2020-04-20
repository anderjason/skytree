import { Percent } from "../Percent";
export declare class Ratio {
    private _value;
    static ofDecimal(decimalValue: number): Ratio;
    static ofFraction(numerator: number, denominator: number): Ratio;
    static ofValueAndRange(value: number, min: number, max: number): Ratio;
    static ofPercent(percent: Percent): Ratio;
    private constructor();
    toDecimal(): number;
    toPercent(): Percent;
    toString(): string;
    withAddedRatio(addRatio: Ratio): Ratio;
    withAddedDecimal(decimal: number): Ratio;
    withMultipliedRatio(multiplyRatio: Ratio): Ratio;
    withMultipliedDecimal(decimal: number): Ratio;
}
