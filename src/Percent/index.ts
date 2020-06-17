import { Ratio } from "../Ratio";

export class Percent {
  private _value: number;

  static givenNumber(value: number): Percent {
    return new Percent(value);
  }

  static givenRatio(ratio: Ratio): Percent {
    return new Percent(ratio.toDecimal() * 100);
  }

  static givenString(value: string): Percent {
    return new Percent(parseFloat(value));
  }

  private constructor(value: number) {
    this._value = value;
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
