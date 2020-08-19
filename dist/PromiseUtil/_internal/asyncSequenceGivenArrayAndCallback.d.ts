export declare function asyncSequenceGivenArrayAndCallback<T>(array: T[], fn: (item: T, idx: number, array: T[]) => Promise<any>): Promise<void>;
