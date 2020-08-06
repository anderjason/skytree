import { Observable } from "../Observable";
import { Handle } from "../Handle";
import { ManagedObject } from "../ManagedObject";
export declare type JobState = "queued" | "running" | "finished" | "cancelled";
export interface Job {
    state: Observable<JobState>;
    handle: Handle;
}
export declare type JobCallback = () => Promise<void>;
export declare class SequentialWorker extends ManagedObject {
    static ofEmpty(): SequentialWorker;
    private _jobs;
    private _callbackByJob;
    private _isBusy;
    private constructor();
    addWork: (callback: JobCallback) => Job;
    initManagedObject(): void;
    private startNextJob;
    private runJob;
}
