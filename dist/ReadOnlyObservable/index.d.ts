import { SimpleEvent } from "../SimpleEvent";
import { Observable } from "../Observable";
export declare class ReadOnlyObservable<T> {
    static givenObservable<T>(observable: Observable<T>): ReadOnlyObservable<T>;
    private _observable;
    private _isObservable;
    private constructor();
    get value(): T;
    get didChange(): SimpleEvent<T>;
}
