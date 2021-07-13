import { Receipt, Observable } from "@anderjason/observable";
import { ArrayUtil } from "@anderjason/util";
import { Actor } from "../Actor";

export type JobState = "queued" | "running" | "finished" | "cancelled";

export interface Job {
  state: Observable<JobState>;
  priority: number;
  receipt: Receipt;
}

export type JobCallback = () => Promise<void>;
export type CancelledJobCallback = () => void;

export interface SequentialWorkerProps {}

export class SequentialWorker extends Actor<SequentialWorkerProps> {
  private _jobs: Job[] = [];
  private _callbackByJob = new Map<Job, JobCallback>();
  private _isBusy: boolean = false;

  onActivate() {
    this.startNextJob();
  }

  addWork(
    callback: JobCallback,
    cancelledCallback?: CancelledJobCallback,
    priority: number = 5
  ): Job {
    const state = Observable.givenValue<JobState>("queued");

    const receipt = this.cancelOnDeactivate(
      new Receipt(() => {
        if (job.state.value === "queued") {
          job.state.setValue("cancelled");
        }

        this._jobs = ArrayUtil.arrayWithoutValue(this._jobs, job);
        this._callbackByJob.delete(job);

        if (cancelledCallback != null) {
          try {
            cancelledCallback();
          } catch (err) {
            console.error(err);
          }
        }
      })
    );

    const job: Job = {
      receipt: receipt,
      priority,
      state,
    };

    this._jobs.push(job);
    this._callbackByJob.set(job, callback);

    setTimeout(() => {
      this.startNextJob();
    }, 1);

    return job;
  }

  private startNextJob() {
    if (this._isBusy) {
      return;
    }

    if (this.isActive === false) {
      return;
    }

    const orderedJobs = ArrayUtil.arrayWithOrderFromValue(
      this._jobs,
      (job) => job.priority,
      "descending"
    );

    const nextJob = orderedJobs[0];
    if (nextJob == null) {
      return;
    }

    this._jobs = this._jobs.filter((job) => job !== nextJob);

    this._isBusy = true;

    this.runJob(nextJob).then(() => {
      this._isBusy = false;
      this.startNextJob();
    });
  }

  private async runJob(job: Job) {
    if (job == null) {
      return;
    }

    if (job.state.value !== "queued") {
      return;
    }

    job.state.setValue("running");

    const callback = this._callbackByJob.get(job);
    this._callbackByJob.delete(job);

    try {
      await callback();
    } catch (err) {
      console.error(err);
    }

    job.state.setValue("finished");
  }
}
