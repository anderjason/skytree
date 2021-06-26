import {
  Observable,
  ObservableBase,
  ReadOnlyObservable,
  Receipt,
} from "@anderjason/observable";
import { ArrayUtil, ObjectUtil, ValuePath } from "@anderjason/util";
import { Actor } from "../Actor";

export interface PathBindingProps<TI, TO> {
  input: ObservableBase<TI>;
  path: ValuePath;

  output?: Observable<TO>;
}

interface BindingGroup {
  bindings: Set<PathBinding<unknown, unknown>>;
  inputReceipt: Receipt;
}

export class PathBinding<TI, TO = unknown> extends Actor<
  PathBindingProps<TI, TO>
> {
  private static bindingGroupsByInput = new Map<unknown, BindingGroup>();

  static refreshAllHavingInput(input: unknown): void {
    const bindingGroup = this.bindingGroupsByInput.get(input);
    if (bindingGroup == null) {
      return;
    }

    const bindings = ArrayUtil.arrayWithOrderFromValue(
      Array.from(bindingGroup.bindings),
      (binding) => binding.props.path.toParts().length,
      "ascending"
    );

    bindings.forEach((binding) => {
      binding.refresh();
    });
  }

  private _output: Observable<TO>;
  readonly output: ReadOnlyObservable<TO>;

  constructor(props: PathBindingProps<TI, TO>) {
    super(props);

    if (Observable.isObservable(props.output)) {
      this._output = props.output;
    } else {
      this._output = Observable.ofEmpty(Observable.isStrictEqual);
    }

    this.output = ReadOnlyObservable.givenObservable(this._output);
  }

  onActivate() {
    let bindingGroup: BindingGroup = PathBinding.bindingGroupsByInput.get(
      this.props.input
    );

    if (bindingGroup == null) {
      bindingGroup = {
        bindings: new Set(),
        inputReceipt: this.props.input.didChange.subscribe(() => {
          PathBinding.refreshAllHavingInput(this.props.input);
        }),
      };
      PathBinding.bindingGroupsByInput.set(this.props.input, bindingGroup);
    }

    bindingGroup.bindings.add(this);

    this.refresh();

    this.cancelOnDeactivate(
      new Receipt(() => {
        bindingGroup.bindings.delete(this);
        if (bindingGroup.bindings.size === 0) {
          bindingGroup.inputReceipt.cancel();
          PathBinding.bindingGroupsByInput.delete(this.props.input);
        }
      })
    );
  }

  refresh(): void {
    this._output.setValue(
      ObjectUtil.optionalValueAtPathGivenObject(
        this.props.input.value,
        this.props.path
      ) as TO
    );
  }
}
