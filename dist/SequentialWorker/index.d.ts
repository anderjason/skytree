import { Receipt, Observable } from "@anderjason/observable";
import { Actor } from "../Actor";
export declare type JobState = "queued" | "running" | "finished" | "cancelled";
export interface Job {
    state: Observable<JobState>;
    priority: number;
    receipt: Receipt;
}
export declare type JobCallback = () => Promise<void>;
export declare type CancelledJobCallback = () => void;
export interface SequentialWorkerProps {
}
export declare class SequentialWorker extends Actor<SequentialWorkerProps> {
    private _jobs;
    private _callbackByJob;
    private _isBusy;
    onActivate(): void;
    addWork(callback: JobCallback, cancelledCallback?: CancelledJobCallback, priority?: number): Job;
    private startNextJob;
    private runJob;
}
