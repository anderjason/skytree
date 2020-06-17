export declare class Handle {
    private _releaseFn;
    static givenReleaseFunction(release: () => void): Handle;
    private constructor();
    get isReleased(): boolean;
    release: () => void;
}
