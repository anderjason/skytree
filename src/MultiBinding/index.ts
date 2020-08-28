import { ManagedObject } from "../ManagedObject";
import { ObservableBase } from "../Observable";
import { ObservableSet } from "../ObservableSet";
import { SimpleEvent } from "../SimpleEvent";
import { Handle } from "../Handle";

export type MultiBindingInvalidateMode = "immediate" | "lazy";

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
  private _willCheckNextFrame: boolean = false;
  private _invalidatedSet = new Set();

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
          this._invalidatedSet.add(input);
          this.onChange();
        })
      );
    });

    this.invalidateNow();
  }

  private unsubscribeInputs() {
    this._inputHandles.forEach((handle) => {
      handle.release();
    });
    this._inputHandles = [];
    this._invalidatedSet.clear();
  }

  private onChange() {
    if (this._invalidateMode === "immediate") {
      this.invalidateNow();
      return;
    }

    if (this._invalidatedSet.size === this.inputs.count) {
      this.invalidateNow();
      return;
    }

    if (this._willCheckNextFrame) {
      return;
    }

    this._willCheckNextFrame = true;

    requestAnimationFrame(() => {
      if (this._invalidatedSet.size > 0) {
        this.invalidateNow();
      }
    });
  }

  private invalidateNow() {
    this.didInvalidate.emit();
    this._invalidatedSet.clear();
  }
}
