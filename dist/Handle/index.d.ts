export declare class Handle {
    private static _unreleasedCount;
    static getUnreleasedCount(): number;
    private _releaseFn;
    static givenReleaseFunction(release: () => void): Handle;
    private constructor();
    get isReleased(): boolean;
    release: () => void;
}
