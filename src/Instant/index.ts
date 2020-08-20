import { Duration } from "../Duration";
import { StringUtil } from "..";

interface PortableInstant {
  epochMs: number;
}

export class Instant {
  static isEqual(a: Instant, b: Instant): boolean {
    if (a == null && b == null) {
      return true;
    }

    if (a == null || b == null) {
      return false;
    }

    return a.isEqual(b);
  }

  static ofNow(): Instant {
    return new Instant(new Date().getTime());
  }

  static givenEpochMilliseconds(epochMilliseconds: number): Instant {
    if (typeof epochMilliseconds === "string") {
      return new Instant(parseInt(epochMilliseconds));
    } else {
      return new Instant(epochMilliseconds);
    }
  }

  static givenPortableString(input: string, fallbackValue: Instant): Instant {
    if (StringUtil.stringIsEmpty(input)) {
      return fallbackValue;
    }

    try {
      const obj = JSON.parse(input) as PortableInstant;
      if (typeof obj !== "object") {
        return fallbackValue;
      }

      const { epochMs } = obj;
      if (epochMs == null) {
        return fallbackValue;
      }

      return new Instant(epochMs);
    } catch (err) {
      console.warn(err);
      return fallbackValue;
    }
  }

  private _epochMilliseconds: number;

  private constructor(epochMilliseconds: number) {
    this._epochMilliseconds = epochMilliseconds;
  }

  isEqual(other: Instant): boolean {
    if (other == null) {
      return false;
    }

    return this._epochMilliseconds === other._epochMilliseconds;
  }

  toEpochMilliseconds(): number {
    return this._epochMilliseconds;
  }

  toNativeDate(): Date {
    return new Date(this._epochMilliseconds);
  }

  toString(): string {
    return this.toEpochMilliseconds().toString();
  }

  toPortableString(): string {
    const obj: PortableInstant = {
      epochMs: this._epochMilliseconds,
    };

    return JSON.stringify(obj);
  }

  withAddedDuration(duration: Duration): Instant {
    return new Instant(this._epochMilliseconds + duration.toMilliseconds());
  }
}
