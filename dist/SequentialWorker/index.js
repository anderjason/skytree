"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequentialWorker = void 0;
const Observable_1 = require("../Observable");
const Handle_1 = require("../Handle");
const ManagedObject_1 = require("../ManagedObject");
const ArrayUtil_1 = require("../ArrayUtil");
class SequentialWorker extends ManagedObject_1.ManagedObject {
    constructor() {
        super();
        this._jobs = [];
        this._callbackByJob = new Map();
        this._isBusy = false;
        this.addWork = (callback, cancelledCallback) => {
            const state = Observable_1.Observable.givenValue("queued");
            const handle = this.addHandle(Handle_1.Handle.givenCallback(() => {
                if (job.state.value === "queued") {
                    job.state.setValue("cancelled");
                }
                this._jobs = ArrayUtil_1.ArrayUtil.arrayWithoutValue(this._jobs, job);
                this._callbackByJob.delete(job);
                if (cancelledCallback != null) {
                    try {
                        cancelledCallback();
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            }));
            const job = {
                handle,
                state,
            };
            this._jobs.push(job);
            this._callbackByJob.set(job, callback);
            setTimeout(this.startNextJob, 1);
            return job;
        };
        this.startNextJob = () => {
            if (this._isBusy) {
                return;
            }
            if (this.isInitialized.value === false) {
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
        this.runJob = async (job) => {
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
            }
            catch (err) {
                console.error(err);
            }
            job.state.setValue("finished");
        };
    }
    static ofEmpty() {
        return new SequentialWorker();
    }
    initManagedObject() {
        this.startNextJob();
    }
}
exports.SequentialWorker = SequentialWorker;
//# sourceMappingURL=index.js.map