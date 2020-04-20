import { Percent } from "../Percent";

export class Ratio {
  private _value: number;

  static ofDecimal(decimalValue: number): Ratio {
    return new Ratio(decimalValue);
  }

  static ofFraction(numerator: number, denominator: number): Ratio {
    if (denominator == 0) {
      throw new Error("Denominator must not be 0");
    }

    return new Ratio(numerator / denominator);
  }

  static ofValueAndRange(value: number, min: number, max: number): Ratio {
    if (min > max) {
      throw new Error("Min must be less than max");
    }

    if (value < min) {
      return Ratio.ofDecimal(0);
    }

    if (value > max) {
      return Ratio.ofDecimal(1);
    }

    return Ratio.ofFraction(value - min, max - min);
  }

  static ofPercent(percent: Percent): Ratio {
    const n = percent.toNumber();

    return new Ratio(n / 100);
  }

  private constructor(decimalValue: number) {
    this._value = decimalValue;
  }

  toDecimal(): number {
    return this._value;
  }

  toPercent(): Percent {
    return Percent.ofRatio(this);
  }

  toString(): string {
    return this._value.toString();
  }

  withAddedRatio(addRatio: Ratio): Ratio {
    return this.withAddedDecimal(addRatio.toDecimal());
  }

  withAddedDecimal(decimal: number): Ratio {
    return Ratio.ofDecimal(this._value + decimal);
  }

  withMultipliedRatio(multiplyRatio: Ratio): Ratio {
    return this.withMultipliedDecimal(multiplyRatio.toDecimal());
  }

  withMultipliedDecimal(decimal: number): Ratio {
    return Ratio.ofDecimal(this._value * decimal);
  }
}
