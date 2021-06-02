import {
  Receipt,
  ObservableArray,
  ReadOnlyObservableArray,
  ObservableBase,
  Observable,
} from "@anderjason/observable";
import { Actor } from "../Actor";

export type CountActivatorCallback<T> = (
  index: number
) => T | undefined;

export interface CountActivatorProps<T> {
  input: number | ObservableBase<number>;
  fn: CountActivatorCallback<T>;
}

export class CountActivator<T extends Actor> extends Actor<
  CountActivatorProps<T>
> {
  private _output = ObservableArray.ofEmpty<T>();
  readonly output = ReadOnlyObservableArray.givenObservableArray(this._output);

  private _input: ObservableBase<number>;

  constructor(props: CountActivatorProps<T>) {
    super(props);

    this._input = Observable.givenValueOrObservable(this.props.input);
  }

  onActivate() {
    this.cancelOnDeactivate(
      this._input.didChange.subscribe((newCount, prevCount = 0) => {
        if (newCount == null) {
          return;
        }

        if (newCount > prevCount) {
          for (let i = prevCount; i < newCount; i++) {
            const newObject = this.props.fn(i);
            if (newObject != null) {
              this.addActor(newObject);
              this._output.replaceValueAtIndex(i, newObject);
            }
          }
        } else {          
          for (let i = newCount; i < prevCount; i++) {
            const object = this._output.toOptionalValueGivenIndex(i);
            this.removeActor(object);
          }

          this._output.removeAllWhere((v, idx) => idx >= newCount);
        }
      }, true)
    );

    this.cancelOnDeactivate(
      new Receipt(() => {
        this._output.clear();
      })
    );
  }
}
