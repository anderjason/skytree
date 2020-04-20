"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RateLimitedFunction {
    constructor(definition) {
        this._count = 0;
        this._timeout = null;
        this.invoke = (args) => {
            this._count += 1;
            this._lastArgs = args;
            if (this._isRunning) {
                this._wasInvokedWhileRunning = true;
                return;
            }
            const invokeNow = () => {
                this._isRunning = true;
                this._lastArgs = undefined;
                const onFinishedRunning = () => {
                    const wasInvoked = this._wasInvokedWhileRunning;
                    this._count = 0;
                    this._isRunning = false;
                    this._wasInvokedWhileRunning = false;
                    if (wasInvoked) {
                        this.invoke(this._lastArgs);
                    }
                };
                try {
                    this._fn(args)
                        .then(() => {
                        onFinishedRunning();
                    })
                        .catch((err) => {
                        console.error(err);
                        onFinishedRunning();
                    });
                }
                catch (err) {
                    console.error(err);
                    onFinishedRunning();
                }
            };
            if (this._count === 1 && this._leading) {
                invokeNow();
            }
            const finishedWaiting = () => {
                if (this._trailing) {
                    if (!this._leading || this._count > 1) {
                        invokeNow();
                        return;
                    }
                }
                this._count = 0;
            };
            if (this._timeout != null) {
                clearTimeout(this._timeout);
            }
            this._timeout = setTimeout(finishedWaiting, this._waitDuration.toMilliseconds());
        };
        this.clear = () => {
            if (this._timeout != null) {
                clearTimeout(this._timeout);
                this._timeout = null;
            }
        };
        if (definition.leading == false && definition.trailing == false) {
            throw new Error("Expected at least one of leading or trailing to be true");
        }
        this._fn = definition.fn;
        this._waitDuration = definition.waitDuration;
        this._leading = definition.leading;
        this._trailing = definition.trailing;
        this._isRunning = false;
        this._wasInvokedWhileRunning = false;
    }
    static ofDefinition(definition) {
        return new RateLimitedFunction(definition);
    }
}
exports.RateLimitedFunction = RateLimitedFunction;
//# sourceMappingURL=index.js.map