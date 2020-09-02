export declare type PathPart = string | number;
export declare class ValuePath {
    static isEqual(a: ValuePath, b: ValuePath): boolean;
    static givenParts(pathParts?: PathPart[]): ValuePath;
    static givenString(path?: string): ValuePath;
    static ofEmpty(): ValuePath;
    private _pathParts;
    private constructor();
    get isEmpty(): boolean;
    isEqual(other: ValuePath): boolean;
    isAncestorOf(other: ValuePath): boolean;
    isEqualOrAncestorOf(other: ValuePath): boolean;
    isDescendantOf(other: ValuePath): boolean;
    isEqualOrDescendantOf(other: ValuePath): boolean;
    toParts(): PathPart[];
    toString(): string;
    toRelativePath(descendant: ValuePath): ValuePath;
    withRelativeParts(pathParts?: PathPart[]): ValuePath;
    withRelativeString(pathString: string): ValuePath;
}
