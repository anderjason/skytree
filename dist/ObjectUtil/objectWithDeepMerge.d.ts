export interface DeepMergeOptions {
    clone?: boolean;
    isMergeableObject?: (object: any) => boolean;
    arrayMerge?: (target: any, source: any, options: DeepMergeOptions) => any;
}
export declare function objectWithDeepMerge(target: any, source: any, options?: DeepMergeOptions): any;
