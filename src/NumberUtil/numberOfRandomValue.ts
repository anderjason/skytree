export function numberOfRandomValue(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
