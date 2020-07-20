import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";

export interface TransformerDefinition<TI, TO> {
  input: Observable<TI>;
  converter: (value: TI) => TO;

  output?: Observable<TO>;
}

export class Transformer<TI, TO> extends ManagedObject {
  readonly input: Observable<TI>;
  readonly output: Observable<TO>;

  private _converter: (value: TI) => TO;

  static givenDefinition<TI, TO>(
    definition: TransformerDefinition<TI, TO>
  ): Transformer<TI, TO> {
    return new Transformer(definition);
  }

  private constructor(definition: TransformerDefinition<TI, TO>) {
    super();

    this.input = definition.input;
    this.output = definition.output || Observable.ofEmpty<TO>();
    this._converter = definition.converter;
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
