import { NumberUtil, StringUtil } from "..";

interface PortablePercent {
  value: number;
}

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

  static ofFull(): Percent {
    return new Percent(1);
  }

  static givenPortableString(input: string, fallbackValue: Percent): Percent {
    if (StringUtil.stringIsEmpty(input)) {
      return fallbackValue;
    }

    try {
      const obj = JSON.parse(input) as PortablePercent;
      if (typeof obj !== "object") {
        return fallbackValue;
      }

      const { value } = obj;
      if (value == null) {
        return fallbackValue;
      }

      return new Percent(value);
    } catch (err) {
      console.warn(err);
      return fallbackValue;
    }
  }

  private _value: number;

  private constructor(value: number) {
    this._value = value;
  }

  get isZero(): boolean {
    return this._value === 0;
  }

  get isFull(): boolean {
    return this._value === 1;
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

  toPortableString(): string {
    const obj = {
      value: this._value,
    };

    return JSON.stringify(obj);
  }

  withAddedPercent(other: Percent): Percent {
    return new Percent(this._value + other._value);
  }

  withHardLimit(): Percent {
    return new Percent(NumberUtil.numberWithHardLimit(this._value, 0, 1));
  }
}
