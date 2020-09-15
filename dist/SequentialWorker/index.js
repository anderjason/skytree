"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequentialWorker = void 0;
const observable_1 = require("@anderjason/observable");
const util_1 = require("@anderjason/util");
const ManagedObject_1 = require("../ManagedObject");
class SequentialWorker extends ManagedObject_1.ManagedObject {
    constructor() {
        super(...arguments);
        this._jobs = [];
        this._callbackByJob = new Map();
        this._isBusy = false;
    }
    onActivate() {
        this.startNextJob();
    }
    addWork(callback, cancelledCallback) {
        const state = observable_1.Observable.givenValue("queued");
        const receipt = this.cancelOnDeactivate(new observable_1.Receipt(() => {
            if (job.state.value === "queued") {
                job.state.setValue("cancelled");
            }
            this._jobs = util_1.ArrayUtil.arrayWithoutValue(this._jobs, job);
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
            receipt: receipt,
            state,
        };
        this._jobs.push(job);
        this._callbackByJob.set(job, callback);
        setTimeout(() => {
            this.startNextJob();
        }, 1);
        return job;
    }
    startNextJob() {
        if (this._isBusy) {
            return;
        }
        if (this.isActive.value === false) {
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
    }
    async runJob(job) {
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
    }
}
exports.SequentialWorker = SequentialWorker;
//# sourceMappingURL=index.js.map