export declare type ArrayOrderDirection = "ascending" | "descending";
export declare function arrayWithOrderFromValue<T, TV>(input: T[], getSortableValue: (value: T) => TV, direction: ArrayOrderDirection): T[];
