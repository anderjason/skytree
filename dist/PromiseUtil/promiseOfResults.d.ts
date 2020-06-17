export declare function promiseOfResults<T, R>(input: T[], fn: (element: T, idx: number) => Promise<R>): Promise<R[]>;
