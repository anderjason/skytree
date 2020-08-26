import { ManagedObject } from "../ManagedObject";
import { Observable, ObservableBase } from "../Observable";
import { ObservableSet } from "../ObservableSet";
import { SimpleEvent } from "../SimpleEvent";
import { Handle } from "../Handle";

export type MultiBindingInvalidateMode = "immediate" | "nextFrame";

export interface MultiBindingDefinition {
  inputs: ObservableBase<any>[] | ObservableSet<ObservableBase<any>>;
  invalidateMode: MultiBindingInvalidateMode;
}

export class MultiBinding extends ManagedObject {
  static givenDefinition(definition: MultiBindingDefinition): MultiBinding {
    return new MultiBinding(definition);
  }

  readonly didInvalidate = SimpleEvent.ofEmpty<void>();
  readonly inputs: ObservableSet<ObservableBase<any>>;

  private _inputHandles: Handle[] = [];
  private _invalidateMode: MultiBindingInvalidateMode;
  private _isInvalidating: boolean = false;

  private constructor(definition: MultiBindingDefinition) {
    super();

    if (ObservableSet.isObservableSet(definition.inputs)) {
      this.inputs = definition.inputs;
    } else {
      this.inputs = ObservableSet.givenValues(definition.inputs);
    }

    this._invalidateMode = definition.invalidateMode;
  }

  initManagedObject() {
    this.addHandle(
      this.inputs.didChange.subscribe(() => {
        this.subscribeInputs();
      }, true)
    );

    this.addHandle(
      Handle.givenCallback(() => {
        this.unsubscribeInputs();
      })
    );
  }

  private subscribeInputs() {
    this.unsubscribeInputs();

    this.inputs.toValues().forEach((input) => {
      this._inputHandles.push(
        input.didChange.subscribe(() => {
          this.onChange();
        })
      );
    });
  }

  private unsubscribeInputs() {
    this._inputHandles.forEach((handle) => {
      handle.release();
    });
    this._inputHandles = [];
  }

  private onChange() {
    if (this._invalidateMode === "immediate") {
      this.didInvalidate.emit();
      return;
    }

    if (this._isInvalidating) {
      return;
    }

    this._isInvalidating = true;

    requestAnimationFrame(() => {
      if (this._isInvalidating) {
        this.didInvalidate.emit();
        this._isInvalidating = false;
      }
    });
  }
}
