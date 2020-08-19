import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";

export interface TransformerDefinition<TI, TO> {
  input: Observable<TI>;
  fn: (value: TI) => TO | Promise<TO>;

  output?: Observable<TO>;
}

export class Transformer<TI, TO> extends ManagedObject {
  readonly input: Observable<TI>;
  readonly output: Observable<TO>;

  private _converter: (value: TI) => TO | Promise<TO>;

  static givenDefinition<TI, TO>(
    definition: TransformerDefinition<TI, TO>
  ): Transformer<TI, TO> {
    return new Transformer(definition);
  }

  private constructor(definition: TransformerDefinition<TI, TO>) {
    super();

    this.input = definition.input;
    this.output = definition.output || Observable.ofEmpty<TO>();
    this._converter = definition.fn;
  }

  initManagedObject() {
    let latestChangeId = 0;

    this.addHandle(
      this.input.didChange.subscribe(async (value) => {
        latestChangeId += 1;
        if (latestChangeId > 10000) {
          latestChangeId = 0;
        }

        let thisChangeId = latestChangeId;

        const convertedValue = await this._converter(value);

        if (thisChangeId === latestChangeId) {
          this.output.setValue(convertedValue);
        }
      }, true)
    );
  }
}
