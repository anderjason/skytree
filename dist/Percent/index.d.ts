export declare class Percent {
    static isEqual(a: Percent, b: Percent): boolean;
    static givenString(value: string): Percent;
    static givenFraction(numerator: number, denominator: number): Percent;
    static ofZero(): Percent;
    private _value;
    private constructor();
    isEqual(other: Percent): boolean;
    toString(fractionDigits?: number): string;
    toNumber(denominator: number): number;
}
