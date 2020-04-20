import { Duration } from "../Duration";
interface RateLimitedFunctionDefinition<T> {
    fn: (args?: T) => Promise<void>;
    waitDuration: Duration;
    leading: boolean;
    trailing: boolean;
}
export declare class RateLimitedFunction<T> {
    private _count;
    private _timeout;
    private _lastArgs?;
    private _fn;
    private _waitDuration;
    private _leading;
    private _trailing;
    private _isRunning;
    private _wasInvokedWhileRunning;
    static ofDefinition<T>(definition: RateLimitedFunctionDefinition<T>): RateLimitedFunction<T>;
    private constructor();
    invoke: (args?: T) => void;
    clear: () => void;
}
export {};
