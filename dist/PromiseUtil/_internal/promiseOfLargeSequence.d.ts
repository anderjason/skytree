export declare function promiseOfLargeSequence(totalCount: number, groupSize: number, fn: (limit: number, offset: number) => Promise<void>): Promise<void>;
