import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
import { ObservableSet } from "../ObservableSet";
import { SimpleEvent } from "../SimpleEvent";
import { Handle } from "../Handle";

export class MultiBinding<T> extends ManagedObject {
  static givenInputs<T>(
    inputs: Observable<T>[] | ObservableSet<Observable<T>>
  ): MultiBinding<T> {
    let observableSet: ObservableSet<Observable<T>>;
    if (ObservableSet.isObservableSet(inputs)) {
      observableSet = inputs;
    } else {
      observableSet = ObservableSet.givenValues(inputs);
    }

    return new MultiBinding(observableSet);
  }

  readonly didChange = SimpleEvent.ofEmpty<void>();
  readonly inputs: ObservableSet<Observable<T>>;

  private _inputHandles: Handle[] = [];
  private _willNotifyChange: boolean;

  private constructor(inputs: ObservableSet<Observable<T>>) {
    super();

    this.inputs = inputs;
  }

  initManagedObject() {
    this.addHandle(this.inputs.didChange.subscribe(this.subscribeInputs, true));

    this.addHandle(Handle.givenCallback(this.unsubscribeInputs));
  }

  private subscribeInputs = () => {
    this.unsubscribeInputs();

    this.inputs.toValues().forEach((input) => {
      this._inputHandles.push(input.didChange.subscribe(this.onChange));
    });
  };

  private unsubscribeInputs = () => {
    this._inputHandles.forEach((handle) => {
      handle.release();
    });
    this._inputHandles = [];
  };

  private onChange = () => {
    if (this._willNotifyChange) {
      return;
    }

    this._willNotifyChange = true;

    setTimeout(() => {
      this._willNotifyChange = false;
      this.didChange.emit();
    }, 1);
  };
}
