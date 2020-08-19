import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
import { ObservableSet } from "../ObservableSet";
import { SimpleEvent } from "../SimpleEvent";
import { Handle } from "../Handle";

export class MultiBinding extends ManagedObject {
  static givenInputs(
    inputs: Observable<any>[] | ObservableSet<Observable<any>>
  ): MultiBinding {
    let observableSet: ObservableSet<Observable<any>>;
    if (ObservableSet.isObservableSet(inputs)) {
      observableSet = inputs;
    } else {
      observableSet = ObservableSet.givenValues(inputs);
    }

    return new MultiBinding(observableSet);
  }

  readonly didInvalidate = SimpleEvent.ofEmpty<void>();
  readonly inputs: ObservableSet<Observable<any>>;

  private _inputHandles: Handle[] = [];

  private constructor(inputs: ObservableSet<Observable<any>>) {
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
    this.didInvalidate.emit();
  };
}
