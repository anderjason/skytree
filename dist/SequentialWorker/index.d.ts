import { Handle, Observable } from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";
export declare type JobState = "queued" | "running" | "finished" | "cancelled";
export interface Job {
    state: Observable<JobState>;
    handle: Handle;
}
export declare type JobCallback = () => Promise<void>;
export declare type CancelledJobCallback = () => void;
export declare class SequentialWorker extends ManagedObject {
    static ofEmpty(): SequentialWorker;
    private _jobs;
    private _callbackByJob;
    private _isBusy;
    private constructor();
    initManagedObject(): void;
    addWork(callback: JobCallback, cancelledCallback?: CancelledJobCallback): Job;
    private startNextJob;
    private runJob;
}
