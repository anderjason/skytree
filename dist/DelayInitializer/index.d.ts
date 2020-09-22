import { Duration } from "@anderjason/time";
import { ManagedObject } from "../ManagedObject";
export interface DelayInitializerProps {
    activateAfter: Duration;
    instance: ManagedObject<any>;
    deactivateAfter?: Duration;
}
export declare class DelayInitializer extends ManagedObject<DelayInitializerProps> {
    onActivate(): void;
}
