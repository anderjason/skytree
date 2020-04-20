import { Instant } from "../Instant";

export class Duration {
  private _milliseconds: number;

  static ofMilliseconds(milliseconds: number): Duration {
    return new Duration(milliseconds);
  }

  static ofSeconds(seconds: number): Duration {
    return Duration.ofMilliseconds(seconds * 1000);
  }

  static ofMinutes(minutes: number): Duration {
    return Duration.ofSeconds(minutes * 60);
  }

  static ofHours(hours: number): Duration {
    return Duration.ofMinutes(hours * 60);
  }

  static ofDays(days: number): Duration {
    return Duration.ofHours(days * 24);
  }

  static ofTimeBetweenInstants(start: Instant, end: Instant): Duration {
    return new Duration(
      end.toEpochMilliseconds() - start.toEpochMilliseconds()
    );
  }

  private constructor(milliseconds: number) {
    this._milliseconds = milliseconds;
  }

  toMilliseconds(): number {
    return this._milliseconds;
  }

  toSeconds(): number {
    return this._milliseconds / 1000;
  }

  toMinutes(): number {
    return this.toSeconds() / 60;
  }

  toHours(): number {
    return this.toMinutes() / 60;
  }

  toDays(): number {
    return this.toHours() / 24;
  }

  toDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this._milliseconds));
  }
}
