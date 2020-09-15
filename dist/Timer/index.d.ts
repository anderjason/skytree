import { ManagedObject } from "../ManagedObject";
import { Duration } from "@anderjason/time";
export interface TimerProps {
    fn: () => void;
    duration: Duration;
    isRepeating?: boolean;
}
export declare class Timer extends ManagedObject<TimerProps> {
    private _timeout;
    onActivate(): void;
}
