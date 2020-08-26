import { ManagedObject } from "../ManagedObject";
import { Observable, ObservableBase } from "../Observable";
import { Handle } from "../Handle";

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

  private _sourceValueHandle: Handle;

  private constructor(definition: ConnectorDefinition<T>) {
    super();

    this.source.setValue(definition.source);
    this.target.setValue(definition.target);
  }

  initManagedObject() {
    this.addHandle(
      this.source.didChange.subscribe((source) => {
        if (this._sourceValueHandle != null) {
          this._sourceValueHandle.release();
          this.removeHandle(this._sourceValueHandle);
          this._sourceValueHandle = undefined;
        }

        if (source != null) {
          this._sourceValueHandle = this.addHandle(
            source.didChange.subscribe(() => {
              this.updateTarget();
            }, true)
          );
        }
      })
    );

    this.addHandle(
      this.target.didChange.subscribe(() => {
        this.updateTarget();
      })
    );

    this.addHandle(
      Handle.givenCallback(() => {
        if (this._sourceValueHandle != null) {
          this._sourceValueHandle.release();
          this.removeHandle(this._sourceValueHandle);
          this._sourceValueHandle = undefined;
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
