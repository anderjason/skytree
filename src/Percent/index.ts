import { Ratio } from "../Ratio";

export class Percent {
  private _value: number;

  static isEqual(a: Percent, b: Percent): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  static givenNumber(value: number): Percent {
    return new Percent(value);
  }

  static givenRatio(ratio: Ratio): Percent {
    return new Percent(ratio.toDecimal() * 100);
  }

  static givenString(value: string): Percent {
    return new Percent(parseFloat(value));
  }

  static ofZero(): Percent {
    return new Percent(0);
  }

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
    return `${this._value.toFixed(fractionDigits)}%`;
  }

  toRatio(): Ratio {
    return Ratio.givenPercent(this);
  }

  toNumber(): number {
    return this._value;
  }
}
