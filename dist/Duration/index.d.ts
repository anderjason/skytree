import { Instant } from "../Instant";
export declare class Duration {
    private _milliseconds;
    static ofMilliseconds(milliseconds: number): Duration;
    static ofSeconds(seconds: number): Duration;
    static ofMinutes(minutes: number): Duration;
    static ofHours(hours: number): Duration;
    static ofDays(days: number): Duration;
    static ofTimeBetweenInstants(start: Instant, end: Instant): Duration;
    private constructor();
    toMilliseconds(): number;
    toSeconds(): number;
    toMinutes(): number;
    toHours(): number;
    toDays(): number;
    toDelay(): Promise<void>;
}
