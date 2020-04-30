import { ManagedObject } from "../ManagedObject";
import { Observable } from "../Observable";
export declare class Binding<TI, TO> extends ManagedObject {
    readonly input: Observable<TI>;
    readonly output: Observable<TO>;
    private _converter;
    static ofObservables<TI, TO>(input: Observable<TI>, output: Observable<TO>, converter: (value: TI) => TO): Binding<TI, TO>;
    private constructor();
    initManagedObject(): void;
}
