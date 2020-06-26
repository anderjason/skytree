import { Size3 } from "../Size3";

export class MutableSize3 extends Size3 {
  static givenWidthHeightDepth(
    width: number,
    height: number,
    depth: number
  ): MutableSize3 {
    return new MutableSize3(width, height, depth);
  }

  static givenSize3(size: Size3): MutableSize3 {
    return new MutableSize3(size.width, size.height, size.depth);
  }

  static ofZero(): MutableSize3 {
    return new MutableSize3(0, 0, 0);
  }

  private constructor(width: number, height: number, depth: number) {
    super(width, height, depth);
  }

  set width(value: number) {
    this._width = value;
    this._half = undefined;
  }

  set height(value: number) {
    this._height = value;
    this._half = undefined;
  }

  set depth(value: number) {
    this._depth = value;
  }

  toClone(): MutableSize3 {
    return new MutableSize3(this.width, this.height, this.depth);
  }
}
