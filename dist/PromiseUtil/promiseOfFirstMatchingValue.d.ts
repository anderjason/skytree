export declare function promiseOfFirstMatchingValue<T>(input: T[], fn: (element: T) => Promise<boolean>): Promise<T | undefined>;
