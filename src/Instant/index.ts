import { Duration } from "../Duration";

export class Instant {
  private _epochMilliseconds: number;

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

  private constructor(epochMilliseconds: number) {
    this._epochMilliseconds = epochMilliseconds;
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

  withAddedDuration(duration: Duration): Instant {
    return new Instant(this._epochMilliseconds + duration.toMilliseconds());
  }
}
