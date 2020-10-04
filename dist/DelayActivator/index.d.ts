import { Duration } from "@anderjason/time";
import { Actor } from "../Actor";
export interface DelayActivatorProps {
    actor: Actor<any>;
    activateAfter?: Duration;
    deactivateAfter?: Duration;
}
export declare class DelayActivator extends Actor<DelayActivatorProps> {
    onActivate(): void;
}
