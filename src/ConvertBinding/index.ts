import { Actor } from "../Actor";
import {
  Observable,
  ObservableBase,
  ReadOnlyObservable,
} from "@anderjason/observable";

export interface ConvertBindingProps<TI, TO> {
  input: ObservableBase<TI>;
  fn: (value: TI) => TO | Promise<TO>;

  output?: Observable<TO>;
}

export class ConvertBinding<TI, TO> extends Actor<ConvertBindingProps<TI, TO>> {
  private _output: Observable<TO>;
  readonly output: ObservableBase<TO>;

  constructor(props: ConvertBindingProps<TI, TO>) {
    super(props);

    this._output =
      props.output || Observable.ofEmpty<TO>(Observable.isStrictEqual);
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
