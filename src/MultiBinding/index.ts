import { ObservableBase, TypedEvent } from "@anderjason/observable";
import { Actor } from "../Actor";

export type MultiBindingGroup = ObservableBase<any>[];

export interface MultiBindingProps {
  groups: MultiBindingGroup[];
}

export class MultiBinding extends Actor<MultiBindingProps> {
  static givenGroups(groups: MultiBindingGroup[]): MultiBinding {
    return new MultiBinding({
      groups,
    });
  }

  static givenOneGroup(group: MultiBindingGroup): MultiBinding {
    return new MultiBinding({
      groups: [group],
    });
  }

  static givenAnyChange(inputs: ObservableBase<any>[]): MultiBinding {
    const groups: MultiBindingGroup[] = inputs.map((input) => {
      return [input];
    });

    return new MultiBinding({
      groups,
    });
  }

  readonly didInvalidate = new TypedEvent();

  private _willInvalidateLater: boolean = false;
  private _invalidatedSetByGroup = new Map<
    MultiBindingGroup,
    Set<ObservableBase<any>>
  >();

  onActivate() {
    this.props.groups.forEach((group) => {
      const invalidatedSet = new Set<ObservableBase<any>>();
      this._invalidatedSetByGroup.set(group, invalidatedSet);

      group.forEach((input) => {
        this.cancelOnDeactivate(
          input.didChange.subscribe(() => {
            invalidatedSet.add(input);
            this.onChange();
          })
        );
      });
    });
  }

  private isAnyGroupInvalidated(): boolean {
    return this.props.groups.some((group) => {
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
