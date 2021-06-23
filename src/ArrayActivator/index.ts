import {
  Receipt,
  ObservableArray,
  ObservableArrayBase,
  ReadOnlyObservableArray,
  ObservableBase,
  Observable,
} from "@anderjason/observable";
import { Actor } from "../Actor";

export type ArrayActivatorCallback<TI, TO> = (
  value: TI,
  index: number,
  currentObject?: TO
) => TO | undefined;

export interface ArrayActivatorProps<TI, TO> {
  input: TI[] | ObservableBase<TI[]> | ObservableArrayBase<TI>;
  fn: ArrayActivatorCallback<TI, TO>;
}

export class ArrayActivator<TI, TO extends Actor> extends Actor<
  ArrayActivatorProps<TI, TO>
> {
  private _output = ObservableArray.ofEmpty<TO>();
  readonly output = ReadOnlyObservableArray.givenObservableArray(this._output);

  private _previousInput: TI[] = [];
  private _internalInput = ObservableArray.ofEmpty<TI>();

  private _observableInputArray: ObservableArrayBase<TI>;
  private _observableInput: ObservableBase<TI[]>;

  constructor(props: ArrayActivatorProps<TI, TO>) {
    super(props);

    if (ObservableArray.isObservableArray(props.input)) {
      // input is ObservableArrayBase<TI>
      this._observableInputArray = props.input;
    } else {
      this._observableInput = Observable.givenValueOrObservable(props.input);
    }
  }

  onActivate() {
    if (this._observableInput != null) {
      this.cancelOnDeactivate(
        this._observableInput.didChange.subscribe(input => {
          this._internalInput.sync(input);
        }, true)
      )
    }

    if (this._observableInputArray != null) {
      this.cancelOnDeactivate(
        this._observableInputArray.didChange.subscribe(input => {
          this._internalInput.sync(input);
        }, true)
      )
    }

    this.cancelOnDeactivate(
      this._internalInput.didChange.subscribe((newInput) => {
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
