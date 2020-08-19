export declare function asyncValueGivenArrayAndFilter<T>(input: T[], fn: (element: T) => Promise<boolean>): Promise<T | undefined>;
