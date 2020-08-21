import { ManagedObject } from "../ManagedObject";
declare function assert(value: boolean, failedMessage?: string): void;
declare function assertIsDeepEqual(actual: any, expected: any, failedMessage?: string): void;
declare function assertThrows(fn: () => any, failedMessage?: string): Promise<void>;
export declare class Test {
    private static _allTests;
    static define(label: string, fn: (emptyObject: ManagedObject) => Promise<any> | void): void;
    static assert: typeof assert;
    static assertThrows: typeof assertThrows;
    static assertIsDeepEqual: typeof assertIsDeepEqual;
    static runAll(): Promise<void>;
    readonly label: string;
    private _fn;
    private constructor();
    toPromise(): Promise<void>;
}
export {};
