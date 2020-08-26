import { Observable } from "../Observable";
export declare class Handle {
    static readonly unreleasedCount: Observable<number>;
    static givenCallback(callback: () => void): Handle;
    private _callback;
    private constructor();
    get isReleased(): boolean;
    release(): void;
}
