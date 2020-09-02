import { ObservableSet } from "../ObservableSet";
export declare class Handle {
    static readonly unreleasedSet: ObservableSet<Handle>;
    static givenCallback(callback: () => void): Handle;
    private _callback;
    private constructor();
    get isReleased(): boolean;
    release(): void;
}
