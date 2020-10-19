import {
  Receipt,
  ObservableArray,
  ObservableArrayBase,
  ReadOnlyObservableArray,
} from "@anderjason/observable";
import { Actor } from "../Actor";

export type ArrayActivatorCallback<TI, TO> = (
  value: TI,
  index: number,
  currentObject?: TO
) => TO | undefined;

export interface ArrayActivatorProps<TI, TO> {
  input: TI[] | ObservableArrayBase<TI>;
  fn: ArrayActivatorCallback<TI, TO>;
}

export class ArrayActivator<TI, TO extends Actor> extends Actor<
  ArrayActivatorProps<TI, TO>
> {
  private _output = ObservableArray.ofEmpty<TO>();
  readonly output = ReadOnlyObservableArray.givenObservableArray(this._output);

  private _previousInput: TI[] = [];
  private _observableInput: ObservableArrayBase<TI>;

  constructor(props: ArrayActivatorProps<TI, TO>) {
    super(props);

    if (ObservableArray.isObservableArray(props.input)) {
      this._observableInput = props.input;
    } else {
      this._observableInput = ObservableArray.givenValues(props.input);
    }
  }

  onActivate() {
    this.cancelOnDeactivate(
      this._observableInput.didChange.subscribe((newInput) => {
        if (newInput == null) {
          return;
        }

        for (let i = 0; i < newInput.length; i++) {
          if (this._previousInput[i] !== newInput[i]) {
            const newValue = newInput[i];
            const previousObject = this._output.toOptionalValueGivenIndex(i);

            const newObject = this.props.fn(newValue, i, previousObject);

            if (previousObject !== newObject) {
              if (previousObject != null) {
                this.removeActor(previousObject);
              }

              if (newObject != null) {
                this.addActor(newObject);
              }
            }

            // this needs to happen after adding the new object above,
            // so the object is initialized by the time this observable updates
            this._output.replaceValueAtIndex(i, newObject);
          }
        }

        if (this._previousInput.length > newInput.length) {
          for (let i = newInput.length; i < this._previousInput.length; i++) {
            const object = this._output.toOptionalValueGivenIndex(i);
            if (object != null) {
              this.removeActor(object);
            }
          }

          this._output.removeAllWhere((v, i) => i >= newInput.length);
        }

        this._previousInput = newInput;
      }, true)
    );

    this.cancelOnDeactivate(
      new Receipt(() => {
        this._output.clear();
      })
    );
  }
}
