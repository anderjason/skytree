import { Ratio } from "../Ratio";

export class Percent {
  private _value: number;

  static ofNumber(value: number): Percent {
    return new Percent(value);
  }

  static ofRatio(ratio: Ratio): Percent {
    return new Percent(ratio.toDecimal() * 100);
  }

  static ofString(value: string): Percent {
    return new Percent(parseFloat(value));
  }

  private constructor(value: number) {
    this._value = value;
  }

  toString(fractionDigits?: number): string {
    return `${this._value.toFixed(fractionDigits)}%`;
  }

  toRatio(): Ratio {
    return Ratio.ofPercent(this);
  }

  toNumber(): number {
    return this._value;
  }
}
