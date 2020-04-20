export declare type EasingType = "linear" | "inQuad" | "outQuad" | "inOutQuad" | "inCubic" | "outCubic" | "inOutCubic" | "inQuart" | "outQuart" | "inOutQuart" | "inQuint" | "outQuint" | "inOutQuint" | "inSine" | "outSine" | "inOutSine" | "inExpo" | "outExpo" | "inOutExpo" | "inCirc" | "outCirc" | "inOutCirc" | "inBack" | "outBack" | "inOutBack" | "inElastic" | "outElastic" | "inOutElastic" | "inBounce" | "outBounce" | "inOutBounce";
export declare function numberWithEasing(input: number, type: EasingType): number;
