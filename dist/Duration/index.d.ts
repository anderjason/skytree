import { Instant } from "../Instant";
export declare class Duration {
    private _milliseconds;
    static isEqual(a: Duration, b: Duration): boolean;
    static givenMilliseconds(milliseconds: number): Duration;
    static givenSeconds(seconds: number): Duration;
    static givenMinutes(minutes: number): Duration;
    static givenHours(hours: number): Duration;
    static givenDays(days: number): Duration;
    static givenInstantRange(start: Instant, end: Instant): Duration;
    private constructor();
    isEqual(other: Duration): boolean;
    toMilliseconds(): number;
    toSeconds(): number;
    toMinutes(): number;
    toHours(): number;
    toDays(): number;
}
