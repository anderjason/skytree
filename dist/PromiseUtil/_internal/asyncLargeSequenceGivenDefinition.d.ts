export interface LargeSequenceDefinition {
    totalCount: number;
    groupSize: number;
    fn: (limit: number, offset: number) => Promise<void>;
}
export declare function asyncLargeSequenceGivenDefinition(definition: LargeSequenceDefinition): Promise<void>;
