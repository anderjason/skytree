import { ManagedObject } from "../ManagedObject";
import { Receipt, Observable, ObservableBase } from "@anderjason/observable";

export interface ConnectorDefinition<T> {
  source?: ObservableBase<T>;
  target?: Observable<T>;
}

export class Connector<T> extends ManagedObject {
  static givenDefinition<T>(definition: ConnectorDefinition<T>): Connector<T> {
    return new Connector<T>(definition);
  }

  readonly source = Observable.ofEmpty<ObservableBase<T>>(
    Observable.isStrictEqual
  );

  readonly target = Observable.ofEmpty<Observable<T>>(Observable.isStrictEqual);

  private _sourceValueReceipt: Receipt;

  private constructor(definition: ConnectorDefinition<T>) {
    super();

    this.source.setValue(definition.source);
    this.target.setValue(definition.target);
  }

  initManagedObject() {
    this.addReceipt(
      this.source.didChange.subscribe((source) => {
        if (this._sourceValueReceipt != null) {
          this._sourceValueReceipt.cancel();
          this.removeReceipt(this._sourceValueReceipt);
          this._sourceValueReceipt = undefined;
        }

        if (source != null) {
          this._sourceValueReceipt = this.addReceipt(
            source.didChange.subscribe(() => {
              this.updateTarget();
            }, true)
          );
        }

        this.updateTarget();
      }, true)
    );

    this.addReceipt(
      this.target.didChange.subscribe(() => {
        this.updateTarget();
      })
    );

    this.addReceipt(
      Receipt.givenCancelFunction(() => {
        if (this._sourceValueReceipt != null) {
          this._sourceValueReceipt.cancel();
          this.removeReceipt(this._sourceValueReceipt);
          this._sourceValueReceipt = undefined;
        }
      })
    );
  }

  private updateTarget(): void {
    const source = this.source.value;
    const target = this.target.value;
    if (source == null || target == null) {
      return;
    }

    target.setValue(source.value);
  }
}
