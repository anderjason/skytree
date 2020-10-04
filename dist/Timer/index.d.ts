import { Actor } from "../Actor";
import { Duration } from "@anderjason/time";
export interface TimerProps {
    fn: () => void;
    duration: Duration;
    isRepeating: boolean;
}
export declare class Timer extends Actor<TimerProps> {
    private _timeout;
    onActivate(): void;
}
