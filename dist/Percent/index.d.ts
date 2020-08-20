export declare class Percent {
    static isEqual(a: Percent, b: Percent): boolean;
    static givenString(value: string): Percent;
    static givenFraction(numerator: number, denominator: number): Percent;
    static ofZero(): Percent;
    static ofFull(): Percent;
    static givenPortableString(input: string, fallbackValue: Percent): Percent;
    private _value;
    private constructor();
    get isZero(): boolean;
    get isFull(): boolean;
    isEqual(other: Percent): boolean;
    toString(fractionDigits?: number): string;
    toNumber(denominator: number): number;
    toPortableString(): string;
    withAddedPercent(other: Percent): Percent;
    withHardLimit(): Percent;
}
