import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";

export class Binding<TI, TO> extends ManagedObject {
  readonly input: Observable<TI>;
  readonly output: Observable<TO>;

  private _converter: (value: TI) => TO;

  static givenObservables<TI, TO>(
    input: Observable<TI>,
    output: Observable<TO>,
    converter: (value: TI) => TO
  ): Binding<TI, TO> {
    return new Binding(input, output, converter);
  }

  private constructor(
    input: Observable<TI>,
    output: Observable<TO>,
    converter: (value: TI) => TO
  ) {
    super();

    this.input = input;
    this.output = output;
    this._converter = converter;
  }

  initManagedObject() {
    this.addHandle(
      this.input.didChange.subscribe((value) => {
        const convertedValue = this._converter(value);
        this.output.setValue(convertedValue);
      }, true)
    );
  }
}
