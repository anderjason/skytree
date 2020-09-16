import { ManagedObject } from "../ManagedObject";
import {
  Receipt,
  Observable,
  ObservableBase,
  ReadOnlyObservable,
} from "@anderjason/observable";

export interface ConnectorProps<T> {
  target?: Observable<T>;
}

export class Connector<T> extends ManagedObject<ConnectorProps<T>> {
  private _source = Observable.ofEmpty<ObservableBase<T>>(
    Observable.isStrictEqual
  );
  readonly source = ReadOnlyObservable.givenObservable(this._source);

  private _target = Observable.ofEmpty<Observable<T>>(Observable.isStrictEqual);
  readonly target = ReadOnlyObservable.givenObservable(this._target);

  private _sourceValueReceipt: Receipt;

  onActivate() {
    if (this._target.value == null) {
      this.setTarget(this.props.target);
    }

    this.cancelOnDeactivate(
      this.source.didChange.subscribe((source) => {
        if (this._sourceValueReceipt != null) {
          this.removeCancelOnDeactivate(this._sourceValueReceipt);
          this._sourceValueReceipt.cancel();
          this._sourceValueReceipt = undefined;
        }

        if (source != null) {
          this._sourceValueReceipt = this.cancelOnDeactivate(
            source.didChange.subscribe(() => {
              this.updateTarget();
            }, true)
          );
        }

        this.updateTarget();
      }, true)
    );

    this.cancelOnDeactivate(
      this.target.didChange.subscribe(() => {
        this.updateTarget();
      })
    );

    this.cancelOnDeactivate(
      new Receipt(() => {
        if (this._sourceValueReceipt != null) {
          this.removeCancelOnDeactivate(this._sourceValueReceipt);
          this._sourceValueReceipt.cancel();
          this._sourceValueReceipt = undefined;
        }
      })
    );
  }

  setSource(newSource: T | ObservableBase<T>): void {
    if (Observable.isObservable(newSource)) {
      this._source.setValue(newSource);
    } else {
      this._source.setValue(Observable.givenValue(newSource));
    }
  }

  setTarget(newTarget: Observable<T>): void {
    this._target.setValue(newTarget);
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
