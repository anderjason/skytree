import { Duration } from "../Duration";
export declare class Instant {
    private _epochMilliseconds;
    static ofNow(): Instant;
    static givenEpochMilliseconds(epochMilliseconds: number): Instant;
    private constructor();
    toEpochMilliseconds(): number;
    toNativeDate(): Date;
    toString(): string;
    withAddedDuration(duration: Duration): Instant;
}
