import { ManagedObject } from "../ManagedObject";
import {
  Observable,
  ObservableBase,
  ReadOnlyObservable,
} from "@anderjason/observable";

export interface TransformerDefinition<TI, TO> {
  input: ObservableBase<TI>;
  fn: (value: TI) => TO | Promise<TO>;

  output?: Observable<TO>;
}

export class Transformer<TI, TO> extends ManagedObject {
  readonly input: ObservableBase<TI>;
  readonly output: ObservableBase<TO>;

  private _converter: (value: TI) => TO | Promise<TO>;
  private _output: Observable<TO>;

  static givenDefinition<TI, TO>(
    definition: TransformerDefinition<TI, TO>
  ): Transformer<TI, TO> {
    return new Transformer(definition);
  }

  private constructor(definition: TransformerDefinition<TI, TO>) {
    super();

    this.input = definition.input;

    this._output = definition.output || Observable.ofEmpty<TO>();
    this.output = ReadOnlyObservable.givenObservable(this._output);

    this._converter = definition.fn;
  }

  initManagedObject() {
    let latestChangeId = 0;

    this.addReceipt(
      this.input.didChange.subscribe(async (value) => {
        latestChangeId += 1;
        if (latestChangeId > 10000) {
          latestChangeId = 0;
        }

        let thisChangeId = latestChangeId;

        const convertedValue = await this._converter(value);

        if (thisChangeId === latestChangeId) {
          this._output.setValue(convertedValue);
        }
      }, true)
    );
  }
}
