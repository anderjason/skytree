import { ManagedObject } from "../ManagedObject";
import {
  Observable,
  ObservableBase,
  ReadOnlyObservable,
} from "@anderjason/observable";

export interface TransformerProps<TI, TO> {
  input: ObservableBase<TI>;
  fn: (value: TI) => TO | Promise<TO>;

  output?: Observable<TO>;
}

export class Transformer<TI, TO> extends ManagedObject<
  TransformerProps<TI, TO>
> {
  readonly output: ObservableBase<TO>;

  private _output: Observable<TO>;

  constructor(props: TransformerProps<TI, TO>) {
    super(props);

    this._output = props.output || Observable.ofEmpty<TO>();
    this.output = ReadOnlyObservable.givenObservable(this._output);
  }

  onActivate() {
    let latestChangeId = 0;

    this.cancelOnDeactivate(
      this.props.input.didChange.subscribe(async (value) => {
        latestChangeId += 1;
        if (latestChangeId > 10000) {
          latestChangeId = 0;
        }

        let thisChangeId = latestChangeId;

        const convertedValue = await this.props.fn(value);

        if (thisChangeId === latestChangeId) {
          this._output.setValue(convertedValue);
        }
      }, true)
    );
  }
}
