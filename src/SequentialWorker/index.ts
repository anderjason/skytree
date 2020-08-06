import { Observable } from "../Observable";
import { Handle } from "../Handle";
import { ManagedObject } from "../ManagedObject";
import { ArrayUtil } from "../ArrayUtil";

export type JobState = "queued" | "running" | "finished" | "cancelled";

export interface Job {
  state: Observable<JobState>;
  handle: Handle;
}

export type JobCallback = () => Promise<void>;

export class SequentialWorker extends ManagedObject {
  static ofEmpty(): SequentialWorker {
    return new SequentialWorker();
  }

  private _jobs: Job[] = [];
  private _callbackByJob = new Map<Job, JobCallback>();
  private _isBusy: boolean = false;

  private constructor() {
    super();
  }

  addWork = (callback: JobCallback): Job => {
    const state = Observable.givenValue<JobState>("queued");

    const handle = this.addHandle(
      Handle.givenReleaseFunction(() => {
        if (job.state.value === "queued") {
          job.state.setValue("cancelled");
        }

        this._jobs = ArrayUtil.arrayWithoutValue(this._jobs, job);
        this._callbackByJob.delete(job);
      })
    );

    const job: Job = {
      handle,
      state,
    };

    this._jobs.push(job);
    this._callbackByJob.set(job, callback);

    setTimeout(this.startNextJob, 1);

    return job;
  };

  initManagedObject() {
    this.startNextJob();
  }

  private startNextJob = () => {
    if (this._isBusy) {
      return;
    }

    if (!this.isInitialized) {
      return;
    }

    const nextJob = this._jobs.shift();
    if (nextJob == null) {
      return;
    }

    this._isBusy = true;

    this.runJob(nextJob).then(() => {
      this._isBusy = false;
      this.startNextJob();
    });
  };

  private runJob = async (job: Job) => {
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
  };
}
