import { Observable } from "../Observable";
export declare class Handle {
    static readonly unreleasedCount: Observable<number>;
    static givenReleaseFunction(release: () => void): Handle;
    private _releaseFn;
    private constructor();
    get isReleased(): boolean;
    release: () => void;
}
