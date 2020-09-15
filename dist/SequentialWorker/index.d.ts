import { Receipt, Observable } from "@anderjason/observable";
import { ManagedObject } from "../ManagedObject";
export declare type JobState = "queued" | "running" | "finished" | "cancelled";
export interface Job {
    state: Observable<JobState>;
    receipt: Receipt;
}
export declare type JobCallback = () => Promise<void>;
export declare type CancelledJobCallback = () => void;
export interface SequentialWorkerProps {
}
export declare class SequentialWorker extends ManagedObject<SequentialWorkerProps> {
    private _jobs;
    private _callbackByJob;
    private _isBusy;
    onActivate(): void;
    addWork(callback: JobCallback, cancelledCallback?: CancelledJobCallback): Job;
    private startNextJob;
    private runJob;
}
