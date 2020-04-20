import { Size2 } from "../Size2";

export class MutableSize2 extends Size2 {
  static ofWidthHeight(width: number, height: number): MutableSize2 {
    return new MutableSize2(width, height);
  }

  static ofSize2(size: Size2): MutableSize2 {
    return new MutableSize2(size.width, size.height);
  }

  private constructor(width: number, height: number) {
    super(width, height);
  }

  set width(value: number) {
    this._width = value;
  }

  set height(value: number) {
    this._height = value;
  }

  toClone(): MutableSize2 {
    return new MutableSize2(this.width, this.height);
  }
}
