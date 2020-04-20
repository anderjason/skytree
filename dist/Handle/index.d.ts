export declare class Handle {
    private _releaseFn;
    static ofFunction(release: () => void): Handle;
    private constructor();
    get isReleased(): boolean;
    release: () => void;
}
