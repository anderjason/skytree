import { ManagedObject } from "../ManagedObject";
import { ObservableBase } from "../Observable";
import { SimpleEvent } from "../SimpleEvent";

export type MultiBindingGroup = ObservableBase<any>[];

export class MultiBinding extends ManagedObject {
  static givenGroups(groups: MultiBindingGroup[]): MultiBinding {
    return new MultiBinding(groups);
  }

  static givenOneGroup(group: MultiBindingGroup): MultiBinding {
    return new MultiBinding([group]);
  }

  static givenAnyChange(inputs: ObservableBase<any>[]): MultiBinding {
    const groups: MultiBindingGroup[] = inputs.map((input) => {
      return [input];
    });

    return new MultiBinding(groups);
  }

  readonly didInvalidate = SimpleEvent.ofEmpty<void>();

  private _groups: MultiBindingGroup[];
  private _willInvalidateLater: boolean = false;
  private _invalidatedSetByGroup = new Map<
    MultiBindingGroup,
    Set<ObservableBase<any>>
  >();

  private constructor(groups: MultiBindingGroup[]) {
    super();

    this._groups = groups;
  }

  initManagedObject() {
    this._groups.forEach((group) => {
      const invalidatedSet = new Set<ObservableBase<any>>();
      this._invalidatedSetByGroup.set(group, invalidatedSet);

      group.forEach((input) => {
        this.addHandle(
          input.didChange.subscribe(() => {
            invalidatedSet.add(input);
            this.onChange();
          })
        );
      });
    });
  }

  private isAnyGroupInvalidated(): boolean {
    return this._groups.some((group) => {
      const invalidatedSet = this._invalidatedSetByGroup.get(group);
      return invalidatedSet.size === group.length;
    });
  }

  private onChange() {
    if (this.isAnyGroupInvalidated()) {
      this.invalidateNow();
      return;
    }

    if (this._willInvalidateLater) {
      return;
    }

    this._willInvalidateLater = true;

    setTimeout(() => {
      if (this._willInvalidateLater == true) {
        this.invalidateNow();
      }
    }, 0);
  }

  private invalidateNow() {
    this.didInvalidate.emit();

    this._willInvalidateLater = false;

    for (let [group, invalidatedSet] of this._invalidatedSetByGroup) {
      invalidatedSet.clear();
    }
  }
}
