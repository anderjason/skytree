export class Percent {
  static isEqual(a: Percent, b: Percent): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  static givenString(value: string): Percent {
    if (value == null) {
      throw new Error("Value is required");
    }

    if (value.includes("%")) {
      return Percent.givenFraction(parseFloat(value), 100);
    } else {
      return Percent.givenFraction(parseFloat(value), 1);
    }
  }

  static givenFraction(numerator: number, denominator: number): Percent {
    if (denominator == 0) {
      throw new Error("Denominator must not be 0");
    }

    return new Percent(numerator / denominator);
  }

  static ofZero(): Percent {
    return new Percent(0);
  }

  private _value: number;

  private constructor(value: number) {
    this._value = value;
  }

  isEqual(other: Percent): boolean {
    if (other == null) {
      return false;
    }

    return this._value === other._value;
  }

  toString(fractionDigits?: number): string {
    return `${this.toNumber(100).toFixed(fractionDigits)}%`;
  }

  toNumber(denominator: number): number {
    return this._value * denominator;
  }
}
