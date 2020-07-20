export declare function assert(value: boolean, failedMessage?: string): void;
export declare function assertThrows(fn: () => any, failedMessage?: string): Promise<void>;
export declare class Test {
    private static _allTests;
    static define(label: string, fn: () => Promise<any> | void): void;
    static runAll(): Promise<void>;
    private _label;
    private _fn;
    private constructor();
    toPromise(): Promise<void>;
}
